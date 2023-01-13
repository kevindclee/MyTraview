import { useAtom } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { call } from '../api_config/ApiService'
import curBoardAtom from '../components/atoms/curBoardAtom'
import Modify from '../components/comment/Modify'
import SubComment from '../components/comment/SubComment'
import CountHeart from '../components/heart/CountHeart'
import NavOthers from '../components/main/NavOthers'
import NavOthersAfter from '../components/main/NavOthersAfter'


const ArticleDetailPage = () => {
    const location = useLocation();
    // const [articleId, setArticleId] = useState('')
    const [article, setArticle] = useState('')
    const [title, setTitle] = useState("")
    const [content, setContent] = useState()
    const [uploadDate, setUploadDate] = useState("") // 작성일자
    const [viewCount, setViewCount] = useState("") // 조회수
    const [heartCount, setHeartCount] = useState("") // 좋아요 수
    const [writer, setWriter] = useState("") // 닉네임
    const [curBoard, setCurBoard] = useAtom(curBoardAtom);
    const [comments, setComments] = useState(''); // 댓글들
    const [commentId, setCommentId] = useState("") // 댓글 고유 번호
    const [commentContent, setCommentContent] = useState("")
    const [postSeq, setPostSeq] = useState("") // 게시글 번호(프론트 단)
    const [flag, setFlag] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const checkUser = useRef('');

    const writeComment = (e) => {
        setCommentContent(e.target.value);

    }

    const flagController = (testFlag) => {
        setFlag2(testFlag);
    }

    const commentCreate = () => {

        const req = {
            articleId: curBoard,
            content: commentContent,
        }

        console.log("댓글을 다는 현재 게시글의 번호:" + curBoard);

        const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(req)


        };

        fetch('http://localhost:8100/comment/create', options)
            .then(response => response.json())
            .then((res) => {

                console.log("-----백엔드 응답-----");
                console.log(res);
                console.log("-----백엔드 응답-----");

            })
            .catch(error => console.error('실패', error));
        console.log("handleDetail clicked button")

    } // 댓글 컴포넌트

    useEffect(() => {
        if (location.state) {
            setCurBoard(location.state.id)
            console.log(curBoard);
        }
        fetch(`http://localhost:8100/article/articleId=${curBoard}`)
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                setArticle(response)
                setComments(response.comments)
                if (flag === false) {
                    setFlag(!flag)
                }
                if (flag2 === false) {
                    setFlag2(!flag2)
                }
            })
            .catch(error => console.error(error))
    }
        , [flag, flag2])


    useEffect(() => {
        const req = {
            id: curBoard
        }
        call("/article/checkUser", "POST", req)
            .then((res) => {
                if (res.flag === true) {
                    checkUser.current = res.flag; console.log(checkUser);
                } else {
                    checkUser.current = res.flag; console.log(checkUser);
                }
            })
            .catch((res) => console.log(res))
    },[])    

    
    let [isOpen, setIsOpen] = useState(false)


    const accessToken = sessionStorage.getItem("ACCESS_TOKEN")


    return (
        <>
            {accessToken == null ? <NavOthers /> : <NavOthersAfter />}
            <div className="bg-[url('/public/images/lightHouse.jpg')] opacity-80 bg-cover" style={{height: "200vh"}}>
                {/* <div onClick={() => { console.log(checkUser) }}>dddd</div> */}
                <br /><br /><br /><br /><br />
                <div className='max-w-2xl px-6 py-10 m-auto bg-transparent border-2 rounded-md'>
                   
                    <div className="mb-2 text-2xl font-bold text-center text-gray-500 border-4">
                        제목
                        <div className="w-full py-4 text-sm text-left text-gray-300 border-t-4 px-30">
                            {article.title}
                        </div>
                    </div>
                    <div className='font-semibold border- text-amber-700'>
                        작성일자
                        <span className="px-2 py-4 text-sm font-light text-center text-gray-300">{article.uploadDate}</span>
                        조회수
                        <span className='px-2 py-4 text-sm font-light text-center text-gray-300'>{"" + article.viewCount}</span>
                        작성자
                        <span className="px-2 py-4 text-sm font-light text-center text-gray-300">{"" + article.writer}</span>
                    </div>
                    <div className="mb-2 text-2xl font-bold text-center text-gray-500 border-b-4">
                        내용
                    </div>
                    <div className="items-center w-full h-full bg-gray-100 border-4 rounded-md resize-none mb-9" >

                        {/* html 강제 적용 컴포넌트 */}
                        <div dangerouslySetInnerHTML={{ __html: article.content }} />
                    </div>

                    {/* 좋아요 */}
                    <CountHeart articleId={curBoard} />

                    {/* 댓글창 */}
                    <div className="mb-6">
                        <input name="message" placeholder="댓글입력" onChange={writeComment} className="resize-none focus:outline-none w-full rounded-lg p-2 text-[20px] bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400" />
                        <div className="flex justify-between mt-2">
                            {/* <Link to='/ArticleDetailPage'> */}
                            <button type="submit" onClick={(e) => { commentCreate(); setFlag(!flag); }} className="flex items-center float-right px-4 py-2 text-sm text-white bg-blue-600 rounded-md shadow-lg">댓글 작성
                                <svg className="ml-1" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                            {/* </Link> */}
                        </div>
                    </div>

                    {/* 댓글창 시작*/}
                    <table className="w-full border-collapse table-auto">
                        <tbody className="text-sm font-normal text-left text-gray-100">
                            <tr>
                                <td className='pl-2 text-left text-gray-600'>작성자</td>
                                <td className='pl-2 text-left text-gray-600'>내용</td>
                            </tr>
                            {comments.replyComments === null ?
                                comments && comments.map(comment => (
                                    <tr key={comment.id} className="text-center py-20 border-opacity-10 border-b-2 border-gray-200 bg-gray-100 hover:bg-[#8ab4e97d]">
                                        <td className="pl-2 text-gray-600 text-start">{comment.writer}</td>
                                        <td id={comment.id} className="py-4 pl-2 text-left text-gray-600">{comment.content}</td>
                                        <td><SubComment isOpen={isOpen} content={comment.content} commentId={comment.id} flagController={flagController} flag={flag2} /></td>
                                        <td><Modify isOpen={isOpen} content={comment.content} commentId={comment.id} flagController={flagController} flag={flag2} /></td>
                                    </tr>
                                )
                                ) :
                                comments && comments.map(comment => (
                                    <>
                                        <tr key={comment.id} className=" text-center py-20 border-opacity-10 border-b-2 border-gray-200 bg-gray-100 hover:bg-[#8ab4e97d]">
                                            <td className="pl-2 text-gray-600 text-start">{comment.writer}</td>
                                            <td id={comment.id} className="py-4 pl-2 text-left text-gray-600">{comment.content}</td>
                                            <td><SubComment isOpen={isOpen} content={comment.content} commentId={comment.id} flagController={flagController} flag={flag2} /></td>
                                            <td><Modify isOpen={isOpen} content={comment.content} commentId={comment.id} flagController={flagController} flag={flag2} /></td>
                                        </tr>
                                        {comment.replyComments && comment.replyComments.map(reply => (
                                            <tr key={reply.id} >
                                                <td >
                                                    <td className="pl-2 text-gray-600 text-start">{reply.writer}</td>
                                                    <td id={reply.id} className="py-4 pl-2 text-left text-gray-600">{reply.content}</td>
                                                    <td><Modify isOpen={isOpen} content={reply.content} commentId={reply.id} flagController={flagController} flag={flag2} /></td>
                                                </td>
                                            </tr>
                                        ))}
                                    </>

                                ))
                            }
                        </tbody>
                    </table>

                    {/* 댓글창 끝 */}
                    {checkUser.current===true?
                    <Link to='/ArticleUpdatePage'>
                    <button type='modify' className='px-5 py-2 mx-3 font-bold border-2 rounded-lg text-neutral-300 hover:bg-neutral-200 '>수정</button>
                    </Link> :
                    <></>
                    
                }
                </div>
            </div>

        </>
    )
}

export default ArticleDetailPage
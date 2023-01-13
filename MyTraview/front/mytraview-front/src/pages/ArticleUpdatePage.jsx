import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EditorComponent from '../components/article/EditorComponent'
import curBoardAtom from '../components/atoms/curBoardAtom'
import NavOthers from '../components/main/NavOthers'
import NavOthersAfter from '../components/main/NavOthersAfter'

const ArticleUpdatePage = () => {

    const [articleId, setArticleId] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [curBoard, setCurBoard] = useAtom(curBoardAtom);

    const handleContent = (value) => {
        setContent(value);
    }

    const handleModify = (e) => {

        if (title === "" || content === "") {
            alert("제목 및 내용을 입력해주세요.")

        } else {

            let headers = new Headers({
                "Content-Type": "application/json",
            })

            const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
            if (accessToken && accessToken !== null) {
                headers.append("Authorization", "Bearer " + accessToken);
            }

            const req = {
                id: curBoard,
                title: title,
                content: content,
            }
            console.log(req);
            console.log("글 수정을 위한 엑세스 토큰 확인: " + accessToken);
            const options = {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(req)
            };

            fetch('http://localhost:8100/article', options)
                .then(response => response.json())
                .then((res)=> {alert(res.resMessage); console.log(res); window.location.href ="/viewAllArticles"})
                .catch(error => console.error(error));
            console.log("handleModify clicked button")
        }
    }

    const handleDelete = () => {

        let headers = new Headers({
            "Content-Type": "application/json",
        })

        const accessToken = sessionStorage.getItem("ACCESS_TOKEN")
        if (accessToken && accessToken !== null) {
            headers.append("Authorization", "Bearer " + accessToken);
        }

        const req = {
            id: curBoard,
        }

        console.log(req);
        console.log(curBoard);
        const options = {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(req)
        };

        fetch(`http://localhost:8100/article/articleId=${curBoard}`, options)
            .then(response => {
                if (response.ok) { alert("삭제가 완료되었습니다."); window.location.href ="/viewAllArticles" } else { alert("해당 요청은 작성자만 가능합니다.") }
            })
            .catch(response => response.resMessage);
        console.log("handledelete clicked button")
    }

    useEffect(() => {

        const options = {
            method: 'GET',
        };

        fetch(`http://localhost:8100/article/articleId=${curBoard}`,options)
            .then(response => response.json())
            .then(res => {
                console.log("현재 게시글 번호:" + curBoard);
                setArticleId(res.articleId);
                setTitle(res.title);
                setContent(res.content);
            })
            .catch(error => console.error(error))
    }, [])
    

    const accessToken = sessionStorage.getItem("ACCESS_TOKEN")


    return (
        <>
            {accessToken == null ? <NavOthers /> : <NavOthersAfter />}
            <div className="bg-[url('/public/images/lightHouse.jpg')] opacity-80 bg-cover" style={{height: "170vh"}} >
            <br /><br /><br /><br /><br /> 
            <form>
                <div className='max-w-2xl px-6 py-10 m-auto bg-white rounded-md'>
                    {/* <Link to="/ArticleListPage" className="mb-6 text-2xl font-bold text-left text-gray-500 border-4">
                        목록으로
                    </Link>
                    <div className="mb-6 text-2xl font-bold text-left text-gray-500 border-4">잡담</div> */}
                    <div>
                        <div className="mb-10 text-2xl font-bold text-center text-gray-500 border-4">
                            번호<input type="text" readOnly value={curBoard} className="w-full py-4 text-sm text-center text-gray-900 border-2 px-30" />
                        </div>
                    </div>
                    <div>
                        <div className="mb-10 text-2xl font-bold text-center text-gray-500 border-4">
                            제목
                            <input type="text" name="title"  placeholder={title} onChange={(event) => setTitle(event.target.value)} className="w-full py-4 text-sm text-left text-gray-900 border-2 px-30" />
                        </div>
                    </div>
                    <br></br>
            <div className="items-center text-center text-gray-700 bg-gray-100 rounded-md resize-none mb-9 opacity-80">
              <EditorComponent value={content} onChange={handleContent}/>
            </div>
            <br></br>
                    <Link to='/ArticleListPage'>
                        <button type='delete' onClick={handleDelete} className='float-right px-5 py-2 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200'>글 삭제</button>
                    </Link>
                    {/* <Link to='ArticleDetailPage'> */}
                        <button type='modify' onClick={(e)=>{handleModify(e)}} className='float-right px-5 py-2 font-bold border-2 rounded-lg text-neutral-900 hover:bg-neutral-200'>글 수정</button>
                    {/* </Link> */}

                </div>
            </form>
            </div>
        </>
    )
}

export default ArticleUpdatePage
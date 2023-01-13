package com.mamoorie.mytraview.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.mamoorie.mytraview.entity.Article;
import com.mamoorie.mytraview.entity.Comment;
import com.mamoorie.mytraview.entity.Heart;
import com.mamoorie.mytraview.entity.User;
import com.mamoorie.mytraview.repository.ArticleRepository;
import com.mamoorie.mytraview.repository.UserRepository;
import com.mamoorie.mytraview.service.ArticleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("article")
@RequiredArgsConstructor
public class ArticleController {

	private final UserRepository userRepository;
	
	private final ArticleService articleService;
	
	@GetMapping("/articleId={articleId}")
	public ResponseEntity<?> findArticle(@PathVariable Integer articleId){
		System.out.println("GET: findArticle() ����");
		Article findArticle = articleService.findArticle(articleId);
		Article.Response res = Article.Response.toResponse(findArticle);
		
		return ResponseEntity.ok().body(res);
	}
	
	// 'GET' http://localhost:8100/article
	@GetMapping
	public ResponseEntity<?> findAllArticles() {
		System.out.println("GET: findAllArticles() of ArticleController called");		
		List<Article> articleList = articleService.findAllArticles();
		List<Article.Response> res = Article.Response.toResponseList(articleList);
				return ResponseEntity.ok().body(res);
	}
	
	// 'GET' http://localhost:8100/article/list/:category
	@GetMapping("/list/{category}")
	public List<Article.Response> findArticlesByCategory(@PathVariable String category) {
		System.out.println("GET: findArticlesByCategory() of ArticleController called");		
		List<Article> articleList = articleService.findByCategory(category);
		return Article.Response.toResponseList(articleList);
	}
	
	// 'GET' http://localhost:8100/article/list/:areaCode/:category
	@GetMapping("/list/{areaCode}/{category}")
	public List<Article.Response> findByPlacesAreaCodeAndPlacesCategory(@PathVariable String areaCode, @PathVariable String category) {
		System.out.println("GET: findByPlacesAreaCodeAndPlacesCategory() of ArticleController called");		
		List<Article> articleList = articleService.findByPlacesAreaCodeAndPlacesCategory(areaCode, category);
		return Article.Response.toResponseList(articleList);
	}
	
	// 'GET' http://localhost:8100/article/list/:mapX/:mapY/:placeName
	@GetMapping("/list/{mapX}/{mapY}/{placeName}")
	public List<Article.Response> findByPlacesMapXAndPlacesMapYAndPlacesPlaceName(@PathVariable Double mapX, @PathVariable Double mapY, @PathVariable String placeName) {
		System.out.println("GET: findByPlacesMapXAndPlacesMapYAndPlacesPlaceName() of ArticleController called");		
		List<Article> articleList = articleService.findByPlacesMapXAndPlacesMapYAndPlacesPlaceName(mapX, mapY, placeName);
		return Article.Response.toResponseList(articleList);
	} 
	
	@GetMapping("viewCount")
	public void increaseViewCount(@RequestParam Integer articleId) {
		Article findArticle = articleService.findArticle(articleId);
		Integer beforeViewCount = findArticle.getViewCount();
		findArticle.setViewCount(beforeViewCount+1);
		articleService.createArticle(findArticle);
	}
	
	@PostMapping("/checkUser")
	public ResponseEntity<?> checkUser(@RequestBody Article.Request req ,@AuthenticationPrincipal String email){
		
		String findEmail = articleService.findArticle(req.getId()).getUser().getEmail();
		
		if(!findEmail.equals(email)) {
			return ResponseEntity.badRequest().body(Heart.Response.builder().flag(false).build());
		}
		
		return ResponseEntity.ok().body(Heart.Response.builder().flag(true).build());
		
	}
	
	// 'POST' http://localhost:8100/article
	@PostMapping
	public ResponseEntity<Article.Response> createArticle(@RequestBody @Valid Article.Request request, @AuthenticationPrincipal String email) {
		System.out.println("POST: createArticle() of ArticleController called");		
		Article newArticle = Article.Request.toEntity(request);

		User foundUser = userRepository.findByEmail(email);

		newArticle.setUser(foundUser);
		newArticle.setWriter(foundUser.getName());
		newArticle.setUploadDate(new SimpleDateFormat("yyyy/MM/dd").format(new Date()));
		Article savedArticle = articleService.createArticle(newArticle);
		Article.Response response = Article.Response.toResponse(savedArticle);
		return ResponseEntity.ok().body(response);
	}
	
	@PutMapping
	public ResponseEntity<?> modifyArticle(@RequestBody Article.Request req, @AuthenticationPrincipal String email){
		System.out.println("PUT: modifyArticle() of ArticleController called");
		
		String findEmail = articleService.findArticle(req.getId()).getUser().getEmail();
		
		if(!findEmail.equals(email)) {
			return ResponseEntity.badRequest().body(Article.Response.builder().resMessage("작성자만 가능합니다.").build());
		}
		
		Article articleEntity = Article.Request.toEntity(req);
		
		Article updatedArticle = articleService.update(articleEntity);
		
		Article.Response res = Article.Response.toResponse(updatedArticle);
		
		return ResponseEntity.ok().body(res.builder().resMessage("수정에 성공하였습니다.").build());
	}
	
	@DeleteMapping("/articleId={articleId}")
	public ResponseEntity<?> removeArticle(@PathVariable Integer articleId, @AuthenticationPrincipal String email){
		
		String findEmail = articleService.findArticle(articleId).getUser().getEmail();
		
		if(!findEmail.equals(email)) {
			return ResponseEntity.badRequest().body(Article.Response.builder().resMessage("작성자만 가능합니다.").build());
		}
		
		articleService.delete(articleId);
		
		Article.Response res = Article.Response.builder().resMessage("삭제가 완료 됐습니다.").build();
		
		return ResponseEntity.ok().body(res);
	}

}
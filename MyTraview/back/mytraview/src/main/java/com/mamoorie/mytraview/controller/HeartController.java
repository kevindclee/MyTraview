package com.mamoorie.mytraview.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mamoorie.mytraview.entity.Heart;
import com.mamoorie.mytraview.service.HeartService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("heart")
@RequiredArgsConstructor
@Slf4j
public class HeartController {
	
	private final HeartService heartService;
	
	@PostMapping
	public ResponseEntity<?> onHeart(@RequestBody Heart.Request req, @AuthenticationPrincipal String email) {
			
		return ResponseEntity.ok().body(heartService.onHeart(req, email));
	}
	
	@Transactional
	@DeleteMapping
	public ResponseEntity<?> unHeart(@RequestBody Heart.Request req, @AuthenticationPrincipal String email) {
		
		
		return ResponseEntity.ok().body(heartService.offHeart(req, email));
	}
	
	//테스트 용
	@GetMapping("/viewAll")
	public ResponseEntity<?> viewAllHeart(){
		
		return ResponseEntity.ok().body(heartService.viewAll());
	}
	
	//한 유저가 좋아요 누른 글 확인
	@GetMapping("/viewAllByUser")
	public ResponseEntity<?> likedArticles(@AuthenticationPrincipal String email){
		
		return ResponseEntity.ok().body(heartService.viewUserHeart(email));
	}
	
	@GetMapping("/articleId={articleId}")
	public ResponseEntity<?> checkOnHeart(@PathVariable Integer articleId, @AuthenticationPrincipal String email){
		
		try {
		Heart findHeart = heartService.viewByArticleIdAndEmail(email, articleId);
		
		Heart.Response res = Heart.Response.toResponse(findHeart);
		
		return ResponseEntity.ok().body(res);
		
		}catch(NullPointerException e) {
			return ResponseEntity.ok().body("정상적인 응답이지만 null 이기에 catch 처리함");
		}
	}
	
	@GetMapping("countHeart={articleId}")
	public ResponseEntity<?> countHeartByArticleId(@PathVariable Integer articleId){
		List<Heart> hearts = heartService.viewAllByArticleId(articleId);
		
		Integer count = hearts.size();
		
		return ResponseEntity.ok().body(Heart.Response.builder().articleId(count).build());
	}
	
}

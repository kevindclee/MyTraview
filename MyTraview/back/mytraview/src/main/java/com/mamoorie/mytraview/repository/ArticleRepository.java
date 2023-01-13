package com.mamoorie.mytraview.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mamoorie.mytraview.entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

	// https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods
	
//	// locationId
//	List<Fruit> findByLocationsLocationId(int locationId);
//	List<Fruit> findDistinctByLocationsLocalEngName(String localEngName);
//	Fruit findDistinctByItemNameAndLocationsLocalEngName(String itemName, String localEngName);
//	// harvestDate

//	List<Fruit> findByHarvestStartBeforeAndHarvestEndAfter(Date curDate1, Date curDate2);
	
	List<Article> findByPlacesCategory(String category);
	List<Article> findByPlacesAreaCodeAndPlacesCategory(String areaCode, String category);
	
	List<Article> findByPlacesMapXAndPlacesMapYAndPlacesPlaceName(Double mapX, Double mapY, String placeName);

	List<Article> findAllByWriter(String writer);
	
//	Article findByArticleId(Integer id); // 임시추가
//	List<Article> findByWriter(String writer); // 임시추가
	
//	Article findAllById(Integer id); // 임시추가
//	void deleteById(Integer id); // 임시추가
}
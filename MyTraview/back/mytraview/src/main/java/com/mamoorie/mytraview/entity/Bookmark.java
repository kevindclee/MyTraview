package com.mamoorie.mytraview.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Bookmark {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "BOOKMARK_ID")
	private Integer id;

	@Column(name = "BOOKMARK_NAME")
	private String name;

	@OneToMany(mappedBy = "bookmark")
	@JsonManagedReference(value = "bookmark-article")
	private List<Article> articles;

	@ManyToOne
	@JoinColumn
	@JsonBackReference(value = "user-bookmark")
	private User user;

	public void setUser(User user) {
		this.user = user;
		user.getBookmarks().add(this);
	}
	
	@Builder
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Request {

		private Integer id;
		private String name;
		private List<Article> articles;
		private User user;

		public static Bookmark toEntity(final Bookmark.Request req) {
			return Bookmark.builder()
					.id(req.getId())
					.name(req.getName())
					.articles(req.getArticles())
					.build();
		}
	}

	@Builder
	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Response {

		private Integer id;
		private String name;
		private List<Article> articles;

		public static Bookmark.Response toResponse(final Bookmark bookmarkEntity) {
			return Bookmark.Response.builder()
					.id(bookmarkEntity.getId())
					.name(bookmarkEntity.getName())
					.articles(bookmarkEntity.getArticles())
					.build();
		}

		public static List<Bookmark.Response> toResponseList(final List<Bookmark> bookmarks) {
			List<Bookmark.Response> bookmarkList = new ArrayList<Bookmark.Response>();
			for (Bookmark bookmark : bookmarks) {
				bookmarkList.add(Bookmark.Response.toResponse(bookmark));
			}
			return bookmarkList;
		}
		
	}
}

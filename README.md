# :earth_americas::airplane: My Traview
MyTraview is a web application where users can leave reviews on everything related to travel (food, transportation, accommodation, tourist attractions, themed routes, etc.). It is built with    
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=black"> <img src="https://img.shields.io/badge/Material UI-007FFF?style=flat-square&logo=Material UI&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"> <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=SpringBoot&logoColor=white">  
The name "My Traview" was made by combining "My Travel" and "Review", meaning that it contains individual user's insightful and exciting travel reviews.
This project was built under alternative username [@ldc-bootcamp01](https://github.com/ldc-bootcamp01) during the En-core Playdata bootcamp.

<div align="center">
 
![Alt Text](/readme/demo.gif)

</div>

## Overview
With MyTraview web application, you can:
- Sign up and log in to leave travel reviews on everything related to travel.
- Reviews can be categorized by food, transportation, accommodation, tourist attractions, themed routes, etc., by tagging them, allowing users to easily find reviews by region and category.
- Find other people's travel reviews and the users can comment or like the post.
- For more detailed functionality, see **Architecture Layout** section below.

## How to run
Run the frontend development server
```
npm start
```
Run the backend development server:

Open project with desired IDE &rarr; Run Application

## Architecture Layout

1. Login / Logout / Sign Up
   - User authentication
   - Check for duplicate IDs
   - Email/phone number (sending temporary passwords for forgotten passwords/IDs, sending advertisements)
   - Password confirmation, show/hide password, maintain login even after refreshing
   - Only members can read certain posts.

2. My Page
   - View posts users have written (edit/delete)
   - `My information` with edit function
   - View posts liked

3. Main Screen
   - Pagination
   - Consists of home screen, search bar, recommended posts, event bulletin board

4. Map Functionality
   - Using `Kakao` and `Naver` map APIs, when the map is moved dynamically by mouse or keyboard, various accommodation facilities and places of interest in that location should be displayed.
   - There should be a part where you can view information about the travel destination on the map.

5. Review Bulletin Board
   - Reviews of accommodation information, leisure activities, restaurants, souvenir shops, tourist attractions
   - Reviews of themed routes (you can also recommend courses from recommended posts)

6. Posting / Commenting Functionality
   - Only the author can edit/delete their own posts and comments
   - Writing Board: Selectable category, title, content, attach photos/videos, attach files (such as Excel), set font, font size, write tags
   - Comment Board: Content, writer (no reply function, only leaves a review on the degree of satisfaction like Baemin reviews)
   - Sub Post: Title, author, date written, number of views, content, comments
   - Main Post: Post number, title, author, date written, number of views, categories listed on the left or right,
   - Notice posts pinned at the top
   - Corporate Advertising Bulletin Board
   - Advertisement revenue: usable based on criteria such as the number of items and for how many months

7. Like Functionality
   - When likes accumulate, they go up as recommended posts

8. Recommendation / Search Functionality
   - Recommendation of travel routes: Write travel route posts by region, period, theme

9. Tag Functionality
   - You must select predefined tags by category to write a post
   - Tags determine the category of the review

## Entity Relational Diagram
<div align="center">
<img width="80%" src="https://user-images.githubusercontent.com/108639301/210914181-8467f3dd-1fc9-474b-8b20-e5259104ec64.jpg" />
</div>

## API Docs

1. User
   - SignUp
   - UserInfo
   - UpdateUserInfo
   - DeleteUser

2. Article
   - CreateArticle
   - InquireEachArticle
   - InquireArticlesByCategory
   - InquireArticleByEmail
   - InquireArticleByAreaCode
   - UpdateArticle
   - DeleteArticle

3. Comment
   - CreateComment
   - UpdateComment
   - DeleteComment
   - CreateReplyComment
   - UpdateReplyComment
   - DeleteReplyComment

4. Place
   - SavePlacesByCreaingArticle
   - InquirePlaceByPlaceName
   - InquirePlaceByAreaCode
   - InquirePlaceByMapXAndMapY
   - InquirePlaceByCategory
   - UpdatePlaceInfo
   - DeletePlaceInfo

5. Heart
   - ColourHeart
   - VacateHeart
   - InquireHeartsByArticle
   - InquireHeartsByEmail

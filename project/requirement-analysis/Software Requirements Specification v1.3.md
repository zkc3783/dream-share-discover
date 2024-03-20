# Software Requirements Specification Iteration 1, Version 1.3

| Date | Author |
| ---- | ------ |
| March 15 | Requirement Analysts of each group, Paul(Minghao Chen) |

## 1. Introduction

### 1.1 Purpose

The purpose of this Software Requirements Specification (SRS) document is to provide a detailed overview of our software product, its parameters, and goals. This document is intended to be a guideline for the development and testing phases. It will outline the functionalities and technical details for the development team and stakeholders involved in the project.

### 1.2 Project Scope

The project entails the development of an integrated digital ecosystem comprising mobile applications (including an Android app and a WeChat mini-program) for customers, and a web application for store owners and administrators. This comprehensive platform is designed to enhance the shopping experience by facilitating the discovery and exploration of local shops and unique treasures. It enables customers to seek their distinctive merchandises. Furthermore, the web application caters the dual need of store owners managing their inventories and connecting with a wider community, while also provides administrators with tools to oversee users, stores, and the platform's overall functionality, ensuring a seamless and interactive experience across all user types.

## 2. Business Requirements

* **Terms and Conditions**: Users must agree to terms and conditions before completing account creation.
* **Target Market**: The primary target market for the application is individuals aged 18-35 years.
* **Cross-Platform Availability**: The application will be available across multiple platforms to ensure broad accessibility.
* **User Retention**: The application will implement features like customizable preferences and rewards to ensure high user retention rates.

## 3. Functional Requirements

### 3.1 Customer Client

* **Goal:** To enhance the shopping experience by facilitating discovery and interaction with stores and items of interest.
* **Summary:** The Customer Client module aims to provide users with a personalized and engaging way to discover unique items and stores, receive recommendations based on their preferences, navigate to these locations, and manage their discovered items. This includes support for Android app and WeChat Mini Program.

#### Requirements

| Action | Description |
| ----------- | ----------- |
| Mobile Login | Users must be able to log in to access personalized features and retain their preferences. |
| Mobile Register | Allows new users to create an account to personalize and save their preferences. |
| Set Customer Info | Users can set and update personal details like name, interests, and password for a tailored app experience. |
| View Map | Display a map showing store locations, facilitating easy navigation to stores of interest. |
| View Hunted List | Provide a list or collection of items the user has interacted with or saved, known as "hunted" items. |
| View Store | Enable users to view detailed information about stores, including items available, through the app. |
| Feedback | Collect user feedback on items and notifications to improve the recommendation algorithm and app functionality. |

### 3.2 Store Owner Client

* **Goal:** To provide store owners with a platform to reach potential customers by showcasing their store and items.
* **Summary:** This module is designed for store owners to manage their store's presence, post updates about new items, and receive insights into customer preferences and store performance, using web Application platforms.

#### Requirements

| Action | Description |
| ----------- | ----------- |
| Web Register | Enables store owners to create an account to manage their store's information and items on the app. |
| Web Login | Allows store owners to access their dashboard for managing their store's profile and items. |
| Set Store info | Store owners can input and update their store's details, including name, location, and item descriptions like name, price, descriptions and images. |
| Get Statistics | Provides statistical data on customer visits and feedback, helping owners understand customer preferences and improve offerings. |

### 3.3 Administrator Server

* **Goal:** To ensure smooth operation and management of the app's backend processes.
* **Summary:** The Administrator Server module, accessible via the Web Application, oversees user and store data management, handles violations, and compiles analytics for ongoing app enhancements, ensuring data integrity and supporting software improvement.

#### Requirements

| Action | Description |
| ----------- | ----------- |
| Admin Login | Administrators can log in to manage the application, including user accounts and store information. |
| Get Statistics | Allows administrators to access comprehensive analytics on app usage, user engagement, and performance for strategic planning. |
| Manage | Administrators have the ability to manage and edit user and store data, and oversee the overall functioning of the app. |

## 4. Use Case

Please check our use case diagram [**here**](./Use%20Case%20Diagram%20v1.3.pdf). The use cases are corresponding to the requirements in 3. Functional Requirements.


## 5. Software Interfaces

### 5.1 Database Interfaces

| Requirement                            | Description                                                  |
| -------------------------------------- | ------------------------------------------------------------ |
| Database API                           | Provide APIs for the Android app, WeChat Mini Program and web application, enabling it to access, display and updates user, store, item, feedback and statistical data.<br>This includes advanced search functionalities allowing the retrieval of user information based on criteria such as age, gender, shopping history, and store information based on location, store type, or specific criteria. |
| Personal and Store Information Storage | Securely store detailed records of users' personal information, preferences, store information, and item details, ensuring privacy and facilitating user and item matching. |
| Feedback Data Recording                | Record and store user feedback on items and notifications for analysis, aiding in service improvement. |
| Statistics and Analysis Report Storage | Store and access statistics and analysis reports of customers and stores. |


### 5.2 Algorithms Interfaces

| Requirement                         | Description                                                  |
| ----------------------------------- | ------------------------------------------------------------ |
| Interest Recommendations            | Analyze customer, store profiles and item details to make personalized recommendations, enhancing user engagement with alerts for items of interest nearby. |
| Feedback Improvement Mechanism      | Utilize customer feedback on recommendations and items to refine the accuracy and effectiveness of matching users with their interests. |
| Customer and Store Analysis Reports | Generate customer and store analysis reports on customer and store interactions, reducing computational burdens and aiding in personalized recommendations. |


## 6. Non Functional Requirements

* **Performance:** The application shall offer seamless operation with minimal delay (<5 seconds response time), ensuring a swift and efficient user experience.
* **Background Operations:** The application shall support running in background mode to maintain functionality without active user engagement.
* **Authentication Persistence:** User authentication shall be required once per month to balance security with user convenience.
* **Data Backups:** Regular backups of user data shall be implemented to prevent data loss.
* **Consistency:** The application shall provide a uniform experience across different sessions and devices.
* **Energy Efficiency:** The application shall be optimized for low power consumption to extend device battery life.
* **Localization:** Multilingual support for Portuguese, English, and Chinese shall be included to cater to a diverse user base.
* **Compliance:** The application shall adhere to applicable data privacy laws and data protection policies.
* **Optimization:** Resource utilization shall be optimized to minimize device consumption.
* **Documentation:** The application’s codebase and architecture shall be thoroughly documented to facilitate maintenance and future updates.
* **Internationalization:** The application shall automatically format data, time, and currency based on the user’s locale to enhance usability.
# Teacher-Assistant

## Inspiration
We enjoy learning by doing. For us doing an engineering project, or building something cool at a hackathon is how we've learned the most in the past. 

Today, many online learning platforms are lecture and pset based. We are undergrads in college and we noticed that many college courses are lecture and pset based as well. We really enjoyed the deep learning course on coursera by Andrew Ng, but one thing we wished for by the end of the class was a more hands on experience and an opportunity to build out a large project as a part of the class. Particularly in an engineering field, we feel that learning by doing, and collaboration are immensely useful and many times better than the lecture-pset model. To address this hole in the world of Ed-tech, we created Buddy. The goal of Buddy is to allow students to learn coding, by doing. The goal of the platform is to allow users to do large software projects with other collaborators. This allows users to gain a deep understanding of the project and also practice collaboration. Another important objective of the platform is to provide high quality support to the users so they stay engaged and learn at an incredible rate. 

## What it does
When users sign in to the platform they can browse projects that have been published to the community and choose which one of these projects to embark on. A "project" on Buddy is a github repo with skeleton code and tests along with some directions for the student. This gives the student some structure and clear goals for the project but also the flexibility and independence to be creative and try things on their own. When a user starts a project, the repo of the skeleton code is automatically forked into their github account. Each project has a helpful AI chatbot associated with it which can help the users with any question or roadblocks they run into. Each chatbot is given information about the specific code repository that the student is working on and is also given a potential solution to the project so it is well equipped to answer most questions it will face from a student about the project. It is also given instructions to not give away the answer and to primarily give hints which lead students in the right direction. 

Moreover, this platform is meant to be a community driven platform. Any user can contribute their own project to the platform by providing skeleton code repo, a solution code repo, and a description of the project. By allowing users to create projects as well, the community can grow larger and be more vibrant. 
 
## How we built it
The frontend and some aspects of the backend are built using the next js framework. We use Github Oauth for authentication and also for permission to make certain actions on behalf of the user as well.  We use MongoDB to maintain a users table and a projects table. We use the Github API for automatically forking repos. We use the OpenAI API and Azure OpenAI to power the chatbot. We use Azure registries, Docker, and Azure App services to power the deployment of out web app. 

## Accomplishments that we're proud of
We are proud that we were able to accomplish most of the features we were aiming to complete before the deadline for this project. We finished functionality to fork repos, to create a chatbot for each project, and we deployed. 

## What we learned
Most of the tech stack we used for this project was completely new for use. We have never used Typescript, nextjs, Azure, Docker, OpenAI API, Github API, OAuth before this project

## What's next for Buddy
Next we plan to incorporate collaboration. We have already looked into using the github API to add collaborators to a project and we think this can be done. We look to add forums and ways for people to communicate on the platform.  

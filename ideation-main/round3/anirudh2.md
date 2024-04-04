# Chrome Extension Idea: Focus Guard

## Authors

Anirudh Bharadwaj, Eric Zou, Kevin Lee, Andy Li

## Problem Statement

People often have their todo lists on their calendar app, notes app, or some external application
When they start browsing, they often become distracted without realizing, and fail to accomplish their outlined tasks
Integration with 3rd party to-do lists like Notion/Google Calendar

## Target Audience

The target audience for FocusGuard includes:

- Users who keep frequent to-do lists
- Users with a busy schedule who frequently utilizes the Internet for their work
- Users who are easily distracted by online browsing 

## Description

FocusGuard is a Chrome extension that allows users to create or import to-do lists directly to their Chrome browser, allowing them to never lose sight of their goals, even while browsing. FocusGuard also includes a feature to completely block sites based on tasks being worked on, as well as limit your daily time spent visiting them, until your to-do list is completed, to ensure that you remain productive. 

An AI assistant will handle certain websites that are not explicitly blocked but may be distracting to the task at hand by sending a warning message to the user about their activity. Extended durations can also trigger warnings. Since FocusGuard constantly learns from your browsing habits, it becomes smarter the longer you use it, allowing it to continually make better suggestions regarding whether your browsing is relevant to the task at hand or not. 

FocusGuard also promises to always keep your personal data private. Data will never be shared with 3rd parties for purposes other than improving the performance of the extension.

## Selling Points

1. Ensures distracted users are constantly aware of their to-do list. 
2. Optional timer associated with each task, allowing users to see if they're on pace to complete tasks, and warning them if they are not.
3. Customized formatting/parsing of to-do list, to allow continuity with previous applications that the user might have had a list on.
4. Ensure that distracting sites are either time-limited or blocked entirely. 
5. Fast setup with AI assisted config to optimize blocking for unseen cases

## User Stories

1. As a busy professional, I want to be able to see and update my to-do lists as I'm working on tasks online.
2. As a student who has difficulty focusing on completing my online homework without going to gaming sites, I want a service that will prevent me from going to these sites.
3. As a professional who wants to manage my large workload, I want a service that will let me outline the tasks I need to complete. 
4. As a user who doesn't want to download an entire application or clog up my calendar with my tasks, I want a lightweight service that allows me to add/remove tasks and is easily accessed from my browser.
5. As an adolescent teen who is addicted to Youtube videos, to the point of affecting my productivity, I want a service that will still let me visit Youtube, but ensures I won't do so until I've completed my work.
6. As an entrepreneur, I want a service that will help me structure my working/research periods. 
7. As a user concerned about my privacy, I want a browser extension that will only work in my browser and will not share my data with anyone. 
8. As an informed consumer, I want an extension with a simple, clean interface that doesn't overwhelm me but also provides convenient all-in-one functionality. 
9. As a high school athlete, I want to focus on homework so that I can have more time to focus on my practice instead of worrying about school work.
10. As a computer science student, I want to be more focused on writing code that is less prone to errors so that I can focus more on actual work instead of debugging.
11. As a PhD student who often falls into online rabbit holes when familiarizing myself with papers, I want an extension that will warn me when my browsing appears to no longer be relevant to the task at hand. 
12. As a teacher, I want my students to be focused on tasks that promote productivity so they can develop healthy study habits.


## Notes

Importing to-do lists from other applications might be difficult based on the internal format data is stored in. Heuristics and certain formats may need to be specified.

Using LLM agents to decide relevance may result in poor performance if no examples are given. RAG could improve performance in this aspect.

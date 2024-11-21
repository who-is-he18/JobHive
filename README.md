JobHive
=======
JobHive is a platform designed to connect job seekers with employers, featuring job postings, profiles, and messaging. It allows employers to browse job seekers' profiles, send messages, and interact with verified profiles. The admin has special privileges such as managing user accounts and moderating activities. The project is built using Flask for the backend, React for the frontend, PostgreSQL for the database, and integrates Safaricom's Daraja API for payments.

`Features`
1. Job Seeker Profiles: Job seekers can create and manage their profiles, including their skills, experience, and salary expectations. <br>
2. Employer Access: Employers can view job seeker profiles, filter by categories, and message job seekers.<br>
3. Admin Dashboard: Admin users can manage the platform, disable user accounts, and oversee platform activities.<br>
4. Messaging System: Job seekers and employers can send and receive messages within the platform.<br>
5. Job Postings: Employers can post job openings to attract relevant job seekers.<br>
6. Profile Verification: Job seekers must have their profiles verified before they can be visible to employers.<br>
7. Payment Integration: Employers must pay to view profiles and contact job seekers, powered by Safaricom's Daraja API.<br>

`Tech Stack`
Frontend: React, Redux Toolkit, CSS<br>
Backend: Flask, PostgreSQL<br>
Database: PostgreSQL<br>
Payment Integration: Safaricom Daraja API<br>
Testing: Jest, Minitests<br>
Authentication: Username/Email/Phone number login<br>
Hosting: Render<br>

`Admin Privileges`
Admin users have special access to:
  - Disable or delete user accounts<br>
  - Moderate profiles<br>
  - Oversee user activities<br>
  - Admin features are accessible via the admin dashboard.<br>

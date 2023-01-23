# mysql-browser
<h3> A functional project written fully in Javacript, where users can enter their MySQL username and password and connect to their database and run simple commands.</h3>

![MySQL_Web_Admin ](https://user-images.githubusercontent.com/117464310/214130681-bbf10b9b-15f7-4cb2-8089-5115dd4a4e32.png)

<h4>Introduction</h4>
<p>This project oprates the same as MySQL Workbench but in a lower level and simpler way. MySQL Web Admin (MWA) doesn't save any of your personal information such as password or username in the backend. Both frontend and backend are written in Javascript. For handling queries and REST APIs I have implemented node Express and Axios.
</p>

<h4>Instructions</h4>
<p>MWA operates as users enter their hostname, username and password of their MySQL.  After connecting they can select any schema from sechema's that are available and start working

<p>MWA allows users to: </p><Li> Select different schemas</li>
<li>Run MySQL commands in the textarea</li> 
<li>Select tables/ views to display in a table</li> 

</p>

<h4>User Installation</h4>
<p>
<ol>
  <li>Users can simply clone the project</li>
   <li>Go to the main page of the repository and on the top click on the green button <> Code and copy the URL</li>
   <li>Open your terminal and go to the directory you would like to clone the project</li>
   <li>Type git clone and paste the URL that you have copied and press enter </li>
  <li>After cloning, open two new terminals in the directory that you have clonned and run the following commands (cd mysql-browser/src/back-end) and (cd mysql-browser/src/front-end) and run (npm install) command, to install all modules and packages</li>
  <li>On the terminal for the front-end folder and run the (npm start) command and in the terminal for the back-end folder and run (node back-end.js ) command</li>
  <li>Browser will bring up the application and it is ready for use</li>
</ol> 
</p>

![Screenshot from 2023-01-23 15-00-10](https://user-images.githubusercontent.com/117464310/214137839-3f79a9c5-267f-4404-919b-d163c0526c4e.png)
![Screenshot from 2023-01-23 15-02-23](https://user-images.githubusercontent.com/117464310/214138230-22e206ce-0ad2-4687-96a9-828d2e1467b2.png)
![Screenshot from 2023-01-23 15-03-50](https://user-images.githubusercontent.com/117464310/214138477-59b14cef-38cf-4fcd-9be2-235fc4b1ec31.png)


<h4>Limitations</h4>
  <li>Users can't run all MySQL commands</li>
  <li>Users can only run commands that start with select, show, display, create, insert, update</li>
  <li>Commands are limited to prevent users from deleting their tables and views by mistake</li>

# [FL Legal Documents App](https://legal-docs-generator.herokuapp.com/)
This app stores templates for a variety of legal documents. Templates can be added, updated, and deleted. The site linked here currently only contains data for FL summonses.

API requests can currently be made using https://fl-legal-docs-api.herokuapp.com/summons/countyName&tier to get summons text in json format. The values for tier are sc, cc, and ca. Example: https://fl-legal-docs-api.herokuapp.com/summons/manatee&sc

## Tech Used
<img src="https://img.shields.io/static/v1?label=|&message=Express&labelColor=42494F&color=3d607e&style=for-the-badge&logo=Express&logo-color=white"/>  
<img src="https://img.shields.io/static/v1?label=|&message=MongoDB&labelColor=42494F&color=213a59&style=for-the-badge&logo=MongoDB&logo-color=white"/>  
<img src="https://img.shields.io/static/v1?label=|&message=Node.js&labelColor=42494F&color=3d607e&style=for-the-badge&logo=Node.js&logo-color=white"/>  
<img src="https://img.shields.io/static/v1?label=|&message=JavaScript&labelColor=42494F&color=3d607e&style=for-the-badge&logo=JavaScript&logo-color=white"/>
<img src="https://img.shields.io/static/v1?label=|&message=HTML5&labelColor=42494F&color=213a59&style=for-the-badge&logo=HTML5&logo-color=white"/>
The server for this app was built using node and express. Testing for the get requests was performed using Postman. MongoDB was used for the database. [TinyMCE](https://www.tiny.cloud/) was used as the text editor for adding and updating templates.

## Future Optimizations
The base CRUD features of this app are functional, and I will be working on the following:
- Adding in the missing summons data for all Florida counties
- Autofill party, case number, and document title information into templates from an xlsx or csv file and print the resulting completed summons document as a pdf file
- Clean up UI for add and edit forms (reduce to single form or split add and update features to separate pages or hide one form while the other is displayed, add popup message to indicate to user that template has been added or updated successfully)
- Add styling
- Adding functionality for FL Orders to Appoint Process Server

## Lessons Learned
When I was first starting to work with APIs, I kept running into a CORS error that prevented me from being able to use the API. It was very cool to discover that the solution to this issue was just adding in a couple lines of code to require and ensure the API met the CORS standard.

I also learned HTML forms only support POST and GET requests. In order to work around this limitation I learned how to use method-override.

# Bad Bank App

This is a model of a banking app that has the ability to authenticate/authorize users who create an account and login.  The app is meant to create fake users as it is not fully secured. The site allows a user to create their account, login, deposit or withdraw "money", and logout. A user is only authorized to deposit/withdraw "money" from their balance so long as they have the required token, which they receive during login. While logged in, your session of transactions are saved and displayed on the session data page until you decide to logout at which the session data is cleared.     

## Installation:

1. Create a new folder: 
        *{projectFolderName}* 
2. Clone BadBank, copying the url provided by the green code button. 
Using the command line, clone the project using: 
    **git clone** *{project url}*  
3. Next move to the project's folder:
     **cd** *{projectFolderName}*
4. Install it's dependencies:
         **npm install**
5. Start the application:
          **npm run dev**

Once started the home screen should look like this: 


![BadBankHomePage](BadBankHomePage.PNG) 

## Tech-Stack

|            Front-End             |           Back-End           |
| -------------------------------- | :--------------------------: |
|  bootstrap:^5.1.0                | cors: ^2.8.5                 |
|  react: ^17.0.2                  | express: ^4.17.1             |
|  react-bootstrap: ^2.0.0-beta.5  | mongodb: ^4.1.3              |
|  react-dom: ^17.0.2              | bcryptjs: ^2.4.3             |
|  react-router-dom: ^5.2.0        | jsonwebtoken: ^8.5.1         | 
|  react-scripts: ^4.0.3           | @auth0/auth0-react: ^1.8.0   |
|                                  | body-parser: ^1.19.0         |

### Features:

- Authorization and Authentication
- Ability to create and store user accounts
- Deposit and Withdrawal from your account balance
- User session history of transactions
- Logout clears session history and saves user balance

## License:

Copyright 2021 **Erik Rice**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

# Heroku Monorepo Guide
Heroku Monorepo Deploy Guide: https://blog.softup.co/how-to-deploy-a-monorepo-to-multiple-heroku-apps-using-github-actions/

# Task Left
1. [OK] Update ChallengeResult get real data, using two different screen for two case:
	- Case 1: Navigate to ChallengeResult after ChallengeDoingSections ended, using route.params to get rankingChart
	- Case 2: Navigate to ChallengeResult by clicking 'View Result' button in EndedChallengeScreen, calling API in useEffect to setRankingChart
2. [OK] Fix backend To actually update ChallengeParticipationModel when 'UserChooseAnAnswer' Event Triggered, not only ChallengeEventsRecordModel
rankingChart 
3. [OK] Update API for getting ChallengeParticipationModel by User's _id, Add real data to DetailResult Screen using data from ChallengeParticipationModel

4. [OK] Sort All rankingChart in every Screen / [NOT OK] or sort in Database

5. [OK] (This was handled by not adding 1 for every correct answer but (1 / TotalNumberOfQuestion) * 10) Run function to scale the score to 10 scale after user finish challenge or challenge end time reached

6. Every Challenge Ended, calculate all the average score off all student and store in student list info of ClassroomModel

7. Handle ChallengeTest Screen after finish Challenge and navigate back from ChallengeResult Screen, MUST find a way to hide the start button.

8. Adding Crontab to create an Monthly Record Once a month, query every ChallengeEventsRecordModel (must Populate/Join by challenge_id)
limit by its Date must be in same month (Must Carefully Research Google for comparing new Date() to a Date String getting from an Mongo JS Object)
then adding all the ranking Score then divide by number then generated an MonthlyRecordModel, create MonthlyRecordModel Model

9. Adding real Data to MonthlyRecordsScreen and MonthlyRecordDetailScreen using data from MonthlyRecordModel

# Client 
* npm run android or expo start (need for scss support installed package)
* Để chạy thử được cái auth mn nhớ sửa cái IP của API_URL trong services/AuthService thành địa chỉ IP của máy mn 
# Server
* npm start

# Note
* React Native Paper [Ref](https://callstack.github.io/react-native-paper/)
* Material Community [Icons](https://materialdesignicons.com/)

# React Native Debugger
*Note: Expo Start Port and React Native Debugger attempt-to-connect port must be the same*

1. Open expo at port 19000: expo start --port 19000
2. Open React Native Debugger .exe file choose port 19000 (default is 8081 which is not matched)
3. Open Expo Application in Android, inside application press Ctrl + M to pop up Debugging Menu, choose Remote Debug Js, the application will reload and the Debugger is connected by now.
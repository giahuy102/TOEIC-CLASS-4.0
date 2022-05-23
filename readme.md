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
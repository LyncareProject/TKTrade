# Server
http://localhost:8080/

npm start 

# Client
http://localhost:3000/

npm start 

# Test 

개발시 client/src/service/apiConfig.js 에서 
const baseUrl = 'http://localhost:8080/api' 설정

개발시 client/src/service/testURL.js 에서 
const baseUrl = 'http://localhost:8080' 설정

# npm build run

개발 완료 후 
client/src/service/apiConfig.js 에서 
const baseUrl = '/api' 설정

client/src/service/testURL.js 에서 
const testURL = '' 설정

npm build run

# Client Pages

pages/Admin/Admin.jsx // 관리자 페이지
pages/Admin/AdminBar.jsx // 관리자 상단바

pages/Login/Login.jsx // 로그인 페이지

pages/Main/Main.jsx // 메인 페이지

pages/Product/Product.jsx // 제품 상세 페이지
pages/Product/ProductAdmin.jsx // 제품 관리 페이지
pages/Product/ProductEditor.jsx // 제품 등록 페이지
pages/Product/ProductList.jsx // 제품 전체 리스트 페이지
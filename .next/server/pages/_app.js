/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "./contexts/auth-context.js":
/*!**********************************!*\
  !*** ./contexts/auth-context.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthContextProvider: () => (/* binding */ AuthContextProvider),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n\n\n// 1. 建立 Context 物件\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\n/*\r\n功能:\r\n  A. 保有登入的狀態\r\n  B. 登入的功能\r\n  C. 登出的功能\r\n  D. 取得包含 JWT token 的物件函式 getAuthHeader()\r\n*/ // 沒有登入的狀態資料\nconst emptyAuth = {\n    id: 0,\n    account: \"\",\n    nickname: \"\",\n    token: \"\"\n};\n// 存到 localStorage 的 key\nconst storageKey = \"admins-auth\";\n// 2. 建立 ContextProvider 元件\nfunction AuthContextProvider({ children }) {\n    const [auth, setAuth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({\n        ...emptyAuth\n    });\n    const login = async (account, password)=>{\n        try {\n            const r = await fetch(\"http://localhost:3005/api/product_list/jwt-login\", {\n                method: \"POST\",\n                body: JSON.stringify({\n                    account,\n                    password\n                }),\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                }\n            });\n            const result = await r.json();\n            if (result.success) {\n                localStorage.setItem(storageKey, JSON.stringify(result.data));\n                setAuth(result.data);\n                return true;\n            }\n        } catch (ex) {\n            console.log({\n                ex\n            });\n            console.log(\"storageKey\", storageKey);\n        }\n        return false; // 走到這裡就是沒有登入成功\n    };\n    const logout = ()=>{\n        localStorage.removeItem(storageKey); // 移除暫存的登入資料\n        setAuth({\n            ...emptyAuth\n        }); // 回復到沒有登入的狀態\n    };\n    const getAuthHeader = ()=>{\n        return {\n            Authorization: `Bearer ${auth.token}`\n        };\n    };\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        // 如果 localStorage 裡已經有狀態的資料, 就直接使用\n        const str = localStorage.getItem(storageKey);\n        if (str) {\n            try {\n                const obj = JSON.parse(str);\n                setAuth(obj);\n            } catch (ex) {}\n        }\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: {\n            auth,\n            logout,\n            login,\n            getAuthHeader\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\iSpan\\\\Desktop\\\\Cafe-React\\\\contexts\\\\auth-context.js\",\n        lineNumber: 78,\n        columnNumber: 5\n    }, this);\n}\n// 3. 匯出 Context\nconst useAuth = ()=>(0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext); // 設定自訂的勾子\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0cy9hdXRoLWNvbnRleHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXVFO0FBRXZFLG1CQUFtQjtBQUNuQixNQUFNSSw0QkFBY0osb0RBQWFBO0FBRWpDOzs7Ozs7QUFNQSxHQUVBLFlBQVk7QUFDWixNQUFNSyxZQUFZO0lBQ2hCQyxJQUFJO0lBQ0pDLFNBQVM7SUFDVEMsVUFBVTtJQUNWQyxPQUFPO0FBQ1Q7QUFFQSx3QkFBd0I7QUFDeEIsTUFBTUMsYUFBYTtBQUVuQiwyQkFBMkI7QUFDcEIsU0FBU0Msb0JBQW9CLEVBQUVDLFFBQVEsRUFBRTtJQUM5QyxNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR1gsK0NBQVFBLENBQUM7UUFBRSxHQUFHRSxTQUFTO0lBQUM7SUFFaEQsTUFBTVUsUUFBUSxPQUFPUixTQUFTUztRQUM1QixJQUFJO1lBQ0YsTUFBTUMsSUFBSSxNQUFNQyxNQUNkLG9EQUNBO2dCQUNFQyxRQUFRO2dCQUNSQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7b0JBQUVmO29CQUFTUztnQkFBUztnQkFDekNPLFNBQVM7b0JBQ1AsZ0JBQWdCO2dCQUNsQjtZQUNGO1lBRUYsTUFBTUMsU0FBUyxNQUFNUCxFQUFFUSxJQUFJO1lBQzNCLElBQUlELE9BQU9FLE9BQU8sRUFBRTtnQkFDbEJDLGFBQWFDLE9BQU8sQ0FBQ2xCLFlBQVlXLEtBQUtDLFNBQVMsQ0FBQ0UsT0FBT0ssSUFBSTtnQkFDM0RmLFFBQVFVLE9BQU9LLElBQUk7Z0JBRW5CLE9BQU87WUFDVDtRQUNGLEVBQUUsT0FBT0MsSUFBSTtZQUNYQyxRQUFRQyxHQUFHLENBQUM7Z0JBQUVGO1lBQUc7WUFDakJDLFFBQVFDLEdBQUcsQ0FBQyxjQUFjdEI7UUFDNUI7UUFDQSxPQUFPLE9BQU8sZUFBZTtJQUMvQjtJQUVBLE1BQU11QixTQUFTO1FBQ2JOLGFBQWFPLFVBQVUsQ0FBQ3hCLGFBQWEsWUFBWTtRQUNqREksUUFBUTtZQUFFLEdBQUdULFNBQVM7UUFBQyxJQUFJLGFBQWE7SUFDMUM7SUFFQSxNQUFNOEIsZ0JBQWdCO1FBQ3BCLE9BQU87WUFDTEMsZUFBZSxDQUFDLE9BQU8sRUFBRXZCLEtBQUtKLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDO0lBQ0Y7SUFFQVAsZ0RBQVNBLENBQUM7UUFDUixtQ0FBbUM7UUFDbkMsTUFBTW1DLE1BQU1WLGFBQWFXLE9BQU8sQ0FBQzVCO1FBQ2pDLElBQUkyQixLQUFLO1lBQ1AsSUFBSTtnQkFDRixNQUFNRSxNQUFNbEIsS0FBS21CLEtBQUssQ0FBQ0g7Z0JBQ3ZCdkIsUUFBUXlCO1lBQ1YsRUFBRSxPQUFPVCxJQUFJLENBQUM7UUFDaEI7SUFDRixHQUFHLEVBQUU7SUFFTCxxQkFDRSw4REFBQzFCLFlBQVlxQyxRQUFRO1FBQUNDLE9BQU87WUFBRTdCO1lBQU1vQjtZQUFRbEI7WUFBT29CO1FBQWM7a0JBQy9EdkI7Ozs7OztBQUdQO0FBRUEsZ0JBQWdCO0FBQ1QsTUFBTStCLFVBQVUsSUFBTTFDLGlEQUFVQSxDQUFDRyxhQUFhLENBQUMsVUFBVTtBQUNoRSxpRUFBZUEsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25leHQtYnM1Ly4vY29udGV4dHMvYXV0aC1jb250ZXh0LmpzP2ZkZWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuXHJcbi8vIDEuIOW7uueriyBDb250ZXh0IOeJqeS7tlxyXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcclxuXHJcbi8qXHJcbuWKn+iDvTpcclxuICBBLiDkv53mnInnmbvlhaXnmoTni4DmhYtcclxuICBCLiDnmbvlhaXnmoTlip/og71cclxuICBDLiDnmbvlh7rnmoTlip/og71cclxuICBELiDlj5blvpfljIXlkKsgSldUIHRva2VuIOeahOeJqeS7tuWHveW8jyBnZXRBdXRoSGVhZGVyKClcclxuKi9cclxuXHJcbi8vIOaykuacieeZu+WFpeeahOeLgOaFi+izh+aWmVxyXG5jb25zdCBlbXB0eUF1dGggPSB7XHJcbiAgaWQ6IDAsXHJcbiAgYWNjb3VudDogJycsXHJcbiAgbmlja25hbWU6ICcnLFxyXG4gIHRva2VuOiAnJyxcclxufTtcclxuXHJcbi8vIOWtmOWIsCBsb2NhbFN0b3JhZ2Ug55qEIGtleVxyXG5jb25zdCBzdG9yYWdlS2V5ID0gJ2FkbWlucy1hdXRoJztcclxuXHJcbi8vIDIuIOW7uueriyBDb250ZXh0UHJvdmlkZXIg5YWD5Lu2XHJcbmV4cG9ydCBmdW5jdGlvbiBBdXRoQ29udGV4dFByb3ZpZGVyKHsgY2hpbGRyZW4gfSkge1xyXG4gIGNvbnN0IFthdXRoLCBzZXRBdXRoXSA9IHVzZVN0YXRlKHsgLi4uZW1wdHlBdXRoIH0pO1xyXG5cclxuICBjb25zdCBsb2dpbiA9IGFzeW5jIChhY2NvdW50LCBwYXNzd29yZCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgciA9IGF3YWl0IGZldGNoKFxyXG4gICAgICAgICdodHRwOi8vbG9jYWxob3N0OjMwMDUvYXBpL3Byb2R1Y3RfbGlzdC9qd3QtbG9naW4nLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBhY2NvdW50LCBwYXNzd29yZCB9KSxcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByLmpzb24oKTtcclxuICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RvcmFnZUtleSwgSlNPTi5zdHJpbmdpZnkocmVzdWx0LmRhdGEpKTtcclxuICAgICAgICBzZXRBdXRoKHJlc3VsdC5kYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGV4KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHsgZXggfSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdzdG9yYWdlS2V5Jywgc3RvcmFnZUtleSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7IC8vIOi1sOWIsOmAmeijoeWwseaYr+aykuacieeZu+WFpeaIkOWKn1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxvZ291dCA9ICgpID0+IHtcclxuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHN0b3JhZ2VLZXkpOyAvLyDnp7vpmaTmmqvlrZjnmoTnmbvlhaXos4fmlplcclxuICAgIHNldEF1dGgoeyAuLi5lbXB0eUF1dGggfSk7IC8vIOWbnuW+qeWIsOaykuacieeZu+WFpeeahOeLgOaFi1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldEF1dGhIZWFkZXIgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YXV0aC50b2tlbn1gLFxyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgLy8g5aaC5p6cIGxvY2FsU3RvcmFnZSDoo6Hlt7LntpPmnInni4DmhYvnmoTos4fmlpksIOWwseebtOaOpeS9v+eUqFxyXG4gICAgY29uc3Qgc3RyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RvcmFnZUtleSk7XHJcbiAgICBpZiAoc3RyKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gSlNPTi5wYXJzZShzdHIpO1xyXG4gICAgICAgIHNldEF1dGgob2JqKTtcclxuICAgICAgfSBjYXRjaCAoZXgpIHt9XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IGF1dGgsIGxvZ291dCwgbG9naW4sIGdldEF1dGhIZWFkZXIgfX0+XHJcbiAgICAgIHtjaGlsZHJlbn1cclxuICAgIDwvQXV0aENvbnRleHQuUHJvdmlkZXI+XHJcbiAgKTtcclxufVxyXG5cclxuLy8gMy4g5Yyv5Ye6IENvbnRleHRcclxuZXhwb3J0IGNvbnN0IHVzZUF1dGggPSAoKSA9PiB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTsgLy8g6Kit5a6a6Ieq6KiC55qE5Yu+5a2QXHJcbmV4cG9ydCBkZWZhdWx0IEF1dGhDb250ZXh0O1xyXG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIkF1dGhDb250ZXh0IiwiZW1wdHlBdXRoIiwiaWQiLCJhY2NvdW50Iiwibmlja25hbWUiLCJ0b2tlbiIsInN0b3JhZ2VLZXkiLCJBdXRoQ29udGV4dFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJhdXRoIiwic2V0QXV0aCIsImxvZ2luIiwicGFzc3dvcmQiLCJyIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJyZXN1bHQiLCJqc29uIiwic3VjY2VzcyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJkYXRhIiwiZXgiLCJjb25zb2xlIiwibG9nIiwibG9nb3V0IiwicmVtb3ZlSXRlbSIsImdldEF1dGhIZWFkZXIiLCJBdXRob3JpemF0aW9uIiwic3RyIiwiZ2V0SXRlbSIsIm9iaiIsInBhcnNlIiwiUHJvdmlkZXIiLCJ2YWx1ZSIsInVzZUF1dGgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./contexts/auth-context.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _contexts_auth_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/contexts/auth-context */ \"./contexts/auth-context.js\");\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    // 使用自訂在頁面層級的版面(layout)\n    const getLayout = Component.getLayout || ((page)=>page);\n    return getLayout(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_auth_context__WEBPACK_IMPORTED_MODULE_2__.AuthContextProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\iSpan\\\\Desktop\\\\Cafe-React\\\\pages\\\\_app.js\",\n                lineNumber: 10,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\iSpan\\\\Desktop\\\\Cafe-React\\\\pages\\\\_app.js\",\n            lineNumber: 9,\n            columnNumber: 7\n        }, this)\n    }, void 0, false));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQThCO0FBQ2dDO0FBQy9DLFNBQVNDLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDcEQsdUJBQXVCO0lBQ3ZCLE1BQU1DLFlBQVlGLFVBQVVFLFNBQVMsSUFBSyxFQUFDQyxPQUFTQSxJQUFHO0lBRXZELE9BQU9ELHdCQUNMO2tCQUNFLDRFQUFDSix1RUFBbUJBO3NCQUNsQiw0RUFBQ0U7Z0JBQVcsR0FBR0MsU0FBUzs7Ozs7Ozs7Ozs7O0FBSWhDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC1iczUvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdAL3N0eWxlcy9nbG9iYWxzLmNzcyc7XHJcbmltcG9ydCB7IEF1dGhDb250ZXh0UHJvdmlkZXIgfSBmcm9tICdAL2NvbnRleHRzL2F1dGgtY29udGV4dCc7XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xyXG4gIC8vIOS9v+eUqOiHquioguWcqOmggemdouWxpOe0mueahOeJiOmdoihsYXlvdXQpXHJcbiAgY29uc3QgZ2V0TGF5b3V0ID0gQ29tcG9uZW50LmdldExheW91dCB8fCAoKHBhZ2UpID0+IHBhZ2UpO1xyXG5cclxuICByZXR1cm4gZ2V0TGF5b3V0KFxyXG4gICAgPD5cclxuICAgICAgPEF1dGhDb250ZXh0UHJvdmlkZXI+XHJcbiAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICA8L0F1dGhDb250ZXh0UHJvdmlkZXI+XHJcbiAgICA8Lz5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJBdXRoQ29udGV4dFByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJnZXRMYXlvdXQiLCJwYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();
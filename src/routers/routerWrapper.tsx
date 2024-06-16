// import React, { Suspense } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoadingIndicator from '@/components/atoms/Loading';
// import { routes } from './routerPath';

// const AppRoutes = () => {
// 	return (
// 		<Router>
// 			<Routes>
// 				{routes.map((route) => {
// 					if (route.children) {
// 						return (
// 							<Route key={route.label} path={route.path} element={<route.layout />}>
// 								{route.children.map((item) => {
// 									return (
// 										<Route
// 											key={item.label}
// 											path={item.path}
// 											element={
// 												<Suspense fallback={<LoadingIndicator />}>
// 													<item.component />
// 												</Suspense>
// 											}
// 										/>
// 									);
// 								})}
// 							</Route>
// 						);
// 					}
// 					return (
// 						<Route key={route.label} element={<route.layout />}>
// 							<Route
// 								path={route.path}
// 								element={
// 									<Suspense fallback={<LoadingIndicator />}>
// 										<route.component />
// 									</Suspense>
// 								}
// 							/>
// 						</Route>
// 					);
// 				})}
// 			</Routes>
// 		</Router>
// 	);
// };

// export default AppRoutes;

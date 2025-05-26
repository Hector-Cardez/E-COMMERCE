import { createGlobalStyle } from "styled-components";

// #8fde73;
//8fde73,9bdaff,72a3d2,4456b6
const GlobalStyles = createGlobalStyle`
:root {	
	justify-content: center;		
	--max-content-width: 100vw;
	--max-content-height: 100vh;
	body {
		box-sizing:border-box;
		background-color: #ccff8c;	
		background-repeat: no-repeat;
		background-image: linear-gradient(0deg, #ccff8c 0%, #97d9e1 100%);
		background-size: cover;
		font-size:30px;
		}
		* {
			box-sizing: border-box;			
			text-align: center;
			}


			@media screen and (max-width: 600px) {
				body {
					max-width: 100%;	
					font-size: 0.8em;
					
					}
					@media screen and (min-width: 599px) {
						body {
							max-width: 100%;
							font-size: 1.5em;
						
							
		
`;

export default GlobalStyles;

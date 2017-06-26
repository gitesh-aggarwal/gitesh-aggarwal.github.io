			$(document).ready(function(){
				$('.click-btn').click(function(){
					var str = $('#pallindrome').val();
					var checkstr = str;
					var revstr = 0;
					var d;
					while(str!=0){
						d = str%10;
						revstr = (revstr*10)+d;
						str = (str-d)/10;
					};
					if(checkstr == revstr){
						alert("yes");
					}
					else{
						alert("no");
					};
				});
			});
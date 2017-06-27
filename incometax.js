$(document).ready(function(){
	//function to add calculate and age in age input.
	
	$(".dateFormatting").on("change", function() {
		
		var birthDate = new Date($(".dateFormatting").val());
		var today = new Date();
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		document.getElementById("ageCalculator").value = age;
	}).trigger("change");
	
	//function to enable submit button.
	/*(function() {
    $('form > input').keyup(function() {

        var empty = false;
        $('form > input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('#register').attr('disabled', 'disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
        } else {
            $('#register').removeAttr('disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
        }
    });
})()*/
	//function to calculate income tax.
	
	$("#register").click(function(){
		var taxPayable = 0;
		var houseProperty = parseInt($(".houseIncome").val());
		var capitalGains = parseInt($(".capitalIncome").val());
		var businessMoney = parseInt($(".businessIncome").val());
		var otherSourcesIncome = parseInt($(".otherIncome").val());
		var annualSalary = parseFloat($(".monthlySalary").val()*12);
		var nilTax = houseProperty + capitalGains + businessMoney + otherSourcesIncome + annualSalary;
		var personAge = parseInt($("#ageCalculator").val());
		if(personAge < 60){
			if(nilTax<250000 && nilTax>0){			//for salary < 250000
				taxPayable=0;
			}else 
			
			if(nilTax<=500000 && nilTax>250000){
				taxPayable=(0.1*(nilTax-250000));
			}else if(nilTax <= 1000000 && nilTax>500000){
				taxPayable= (0.2*(nilTax-500000)) + (0.1*250000);
			}else{
				taxPayable= (0.3*(nilTax-1000000)) + (0.2*500000) + (0.1*250000);
			}
			alert(taxPayable);
		}else{
			if(0 <= nilTax && nilTax<= 300000){			//for salary < 300000
				taxPayable+=0;
			}else if(300000 < nilTax && nilTax< 500000){
				taxPayable=(0.1*(nilTax-300000));
			}else if(500000 < nilTax && nilTax< 1000000){
				taxPayable= (0.2*(nilTax-500000)) + (0.1*200000);
			}else{
				taxPayable= (0.3*(nilTax-1000000)) + (0.2*500000) + (0.1*200000);
			}			
		}
		
		var primaryEducationCess = 0.02*taxPayable;
		var secEducationCess = 0.01*taxPayable;
		var taxAfterEducationCess = taxPayable +primaryEducationCess+secEducationCess;
		alert(taxAfterEducationCess);
		
	});
		
});
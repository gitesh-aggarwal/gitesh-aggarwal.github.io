function birthFunc(date1) {
		
		var birthDate = new Date(date1); //$(".dateFormatting").val()
		var today = new Date();
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
		}
function fetchBasicInfo(a, b, c, d, e, f){
	var clientInfoDict = {
		_FY: a,
		_name: b,
		_age: c,//birthFunc($(".dateFormatting").val()),
		_pan: d,
		_gender: e,
		_email: f,
	}
	return clientInfoDict;
}

		
function fetchIncomeInfo(a, b, c, d, e){
	var incomeDict = {
		
		_annualSalary: a,
		_houseProperty :b, //parseInt($(".houseIncome").val()),
		_capitalGains :c ,//parseInt($(".capitalIncome").val()),
		_businessMoney : d ,//parseInt($(".businessIncome").val()),
		_otherSourcesIncome : e,// parseInt($(".otherIncome").val()),
	}
	
	return incomeDict;
}

function fetchExemptions(a, b){
	var exemptionDict = {
							_exempt10:a,
							_exempt24:b,	
						}
	return exemptionDict;					
}

function fetchExemption10(a, b, c, d){
	var exemption10Dict = {
							_hra:a,
							_conveyance:b,
							_others:c,
							_professionalTax:d,
							}
	return exemption10Dict;
}		

function fetchExemption24(a, b, c){
	var exemption24Dict = {
							_houseProperty:a,
							_homeBuyer:b,
							_homeImprovement:c,	
						}
	return exemption24Dict;
	}	
	
//add all values in dictonary

function sumDict(Dict1){
	var total = 0;
	for(var key in Dict1){
		total+=Dict1[key]; 
	}
	return total;
}

//age<60

function taxCalculation(taxableIncome, age){
	var taxPayable=0;
	
	if(age<60){ 
		var level=250000;
	}else{
		var level=300000;
	}
	
	if(taxableIncome<level && taxableIncome>0){			//for salary < 250000
		taxPayable=0;
	}else 
	
	if(taxableIncome<=500000 && taxableIncome>level){
		taxPayable=(0.1*(taxableIncome-level));
	}else if(taxableIncome <= 1000000 && taxableIncome>500000){
		taxPayable= (0.2*(taxableIncome-500000)) + (0.1*(500000-level));
	}else{
		taxPayable= (0.3*(taxableIncome-1000000)) + (0.2*500000) + (0.1*(500000-level));
	}
	return taxPayable;
}


function eduCess(taxPayable){
	var primary = 0.02*taxPayable;
	var secondary = 0.01*taxPayable;
	
	return ({primary: primary,
			secondary: secondary})
}

function deductionSum(a){
	var dedsum=0;
	var level=0;
	if (a == ".ded80C"){
		level =150000;
	}else if(a == ".ded80Ccd"){
		level = 50000;
	};
		$(a).each(function(){
        dedsum += +$(this).val();
    });
	if(dedsum > level && level != 0){
		dedsum = level;
	}
	return dedsum;
}

function hraCalculation(a,b,c,d){
	if (d == "Metro"){
		var level = 0.5;
	}else{
		var level = 0.4;
	}
	
	var basicIncome =level * a;
	var hraRecieved = b;
	var renthra = c - (0.1*a);
	var hra = Math.min.apply(Math, [basicIncome,hraRecieved,renthra]);
	return hra;
}

$(document).ready(function(){	
	
	$("#register").click(function(){
	var basicInfoDict = fetchBasicInfo(
										$(".financeYr").val(),
										$(".clientName").val(),
										birthFunc($(".dateFormatting").val()),
										$("pan").val(),
										$("gender").val(),
										$("email").val(),
									)
							
	var incomeDict = fetchIncomeInfo(
										parseFloat($(".monthlySalary").val()*12),
										parseFloat($(".houseIncome").val()),
										parseFloat($(".capitalIncome").val()),
										parseFloat($(".businessIncome").val()),
										parseFloat($(".otherIncome").val()),
									);
	
	var hraExemption = 	hraCalculation(parseFloat($(".basicSalary").val()),
						parseFloat($(".hraRecieved").val()),
						parseFloat($(".rentPaid").val()),
						$(".residence").val()
					);
	var minConveyance = Math.min.apply(Math, [1600*12, parseFloat($(".conveyance").val())]);
	
	
	var exemptionDict10 = fetchExemption10(
											hraExemption,
											minConveyance,
											parseFloat($(".otherExempted").val()),
											parseFloat($(".professionalTax").val()),
											);								
	var exemptionDict24 = fetchExemption24(
											parseFloat($(".propertyLoss").val()),
											parseFloat($(".homeBuyer").val()),
											parseFloat($(".homeImprovement").val()),
											);			
	
	var exemptionDict = fetchExemptions(
										sumDict(exemptionDict10),
										sumDict(exemptionDict24),
										);
	var advanceTax = parseFloat($(".advanceTax").val());
	var grossDeduction = deductionSum(".ded80C") + deductionSum(".ded80Ccd") + deductionSum(".ded6A");	
	var calculateGrossIncome = 	sumDict(incomeDict) - (exemptionDict._exempt10 + exemptionDict._exempt24) - grossDeduction;							
	var taxPayable = taxCalculation(calculateGrossIncome, basicInfoDict._age );
	var totalCess  = eduCess(taxPayable).primary + eduCess(taxPayable).secondary;
	var finalTax = taxPayable + totalCess;
	var taxRemaining = finalTax - advanceTax;
	var TIratio = (finalTax/sumDict(incomeDict))*100;
	$('#remainingTax').removeAttr('disabled');
	$('#taxToIncomeRatio').removeAttr('disabled');
	document.getElementById("remainingTax").value = taxRemaining ;
	document.getElementById("taxToIncomeRatio").value = TIratio.toFixed(2) ;
	});	
});
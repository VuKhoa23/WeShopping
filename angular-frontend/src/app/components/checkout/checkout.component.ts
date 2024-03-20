import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { start } from 'repl';
import { CheckoutValidator } from '../../validators/checkout-validator';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  checkoutFormGroup!: FormGroup ;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[] = []
  creditCardMonths: number[] = []
  constructor(private formBuilder: FormBuilder, private formService: FormService){}
  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), CheckoutValidator.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    })
    const startMonth: number = new Date().getMonth() + 1;
    
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )

    this.formService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    )
  }

  onSubmit(){
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }
  }

  copyShippingToBilling(event: Event) {
    const ischecked = (<HTMLInputElement>event.target).checked;
   
    if (ischecked) {
      this.checkoutFormGroup.controls['billingAddress']
      .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
   
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard')
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.expirationYear);

    let startMonth: number = (currentYear == selectedYear) ? (new Date().getMonth() + 1) : 1
    this.formService.getCreditCardMonths(startMonth).subscribe(
      data =>
      { 
        this.creditCardMonths = data;
      }
    );
  }

  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName')
  }
  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName')
  }
  get email(){
    return this.checkoutFormGroup.get('customer.email')
  }

  countries: string[] = [
    "Afghanistan,AF",
    "Albania,AL",
    "Algeria,DZ",
    "American Samoa,AS",
    "Andorra,AD",
    "Angola,AO",
    "Anguilla,AI",
    "Antarctica,AQ",
    "Antigua and Barbuda,AG",
    "Argentina,AR",
    "Armenia,AM",
    "Aruba,AW",
    "Australia,AU",
    "Austria,AT",
    "Azerbaijan,AZ",
    "Bahamas,BS",
    "Bahrain,BH",
    "Bangladesh,BD",
    "Barbados,BB",
    "Belarus,BY",
    "Belgium,BE",
    "Belize,BZ",
    "Benin,BJ",
    "Bermuda,BM",
    "Bhutan,BT",
    "Bolivia,BO",
    "Bosnia and Herzegovina,BA",
    "Botswana,BW",
    "Bouvet Island,BV",
    "Brazil,BR",
    "British Indian Ocean Territory,IO",
    "Brunei Darussalam,BN",
    "Bulgaria,BG",
    "Burkina Faso,BF",
    "Burundi,BI",
    "Cambodia,KH",
    "Cameroon,CM",
    "Canada,CA",
    "Cape Verde,CV",
    "Cayman Islands,KY",
    "Central African Republic,CF",
    "Chad,TD",
    "Chile,CL",
    "China,CN",
    "Christmas Island,CX",
    "Cocos (Keeling) Islands,CC",
    "Colombia,CO",
    "Comoros,KM",
    "Congo,CG",
    "Congo, the Democratic Republic of the,CD",
    "Cook Islands,CK",
    "Costa Rica,CR",
    "Cote d'Ivoire,CI",
    "Croatia,HR",
    "Cuba,CU",
    "Cyprus,CY",
    "Czech Republic,CZ",
    "Denmark,DK",
    "Djibouti,DJ",
    "Dominica,DM",
    "Dominican Republic,DO",
    "Ecuador,EC",
    "Egypt,EG",
    "El Salvador,SV",
    "Equatorial Guinea,GQ",
    "Eritrea,ER",
    "Estonia,EE",
    "Ethiopia,ET",
    "Falkland Islands (Malvinas),FK",
    "Faroe Islands,FO",
    "Fiji,FJ",
    "Finland,FI",
    "France,FR",
    "French Guiana,GF",
    "French Polynesia,PF",
    "French Southern Territories,TF",
    "Gabon,GA",
    "Gambia,GM",
    "Georgia,GE",
    "Germany,DE",
    "Ghana,GH",
    "Gibraltar,GI",
    "Greece,GR",
    "Greenland,GL",
    "Grenada,GD",
    "Guadeloupe,GP",
    "Guam,GU",
    "Guatemala,GT",
    "Guinea,GN",
    "Guinea-Bissau,GW",
    "Guyana,GY",
    "Haiti,HT",
    "Heard Island and Mcdonald Islands,HM",
    "Holy See (Vatican City State),VA",
    "Honduras,HN",
    "Hong Kong,HK",
    "Hungary,HU",
    "Iceland,IS",
    "India,IN",
    "Indonesia,ID",
    "Iran, Islamic Republic of,IR",
    "Iraq,IQ",
    "Ireland,IE",
    "Israel,IL",
    "Italy,IT",
    "Jamaica,JM",
    "Japan,JP",
    "Jordan,JO",
    "Kazakhstan,KZ",
    "Kenya,KE",
    "Kiribati,KI",
    "Korea, Democratic People's Republic of,KP",
    "Korea, Republic of,KR",
    "Kuwait,KW",
    "Kyrgyzstan,KG",
    "Lao People's Democratic Republic,LA",
    "Latvia,LV",
    "Lebanon,LB",
    "Lesotho,LS",
    "Liberia,LR",
    "Libyan Arab Jamahiriya,LY",
    "Liechtenstein,LI",
    "Lithuania,LT",
    "Luxembourg,LU",
    "Macao,MO",
    "Macedonia, the Former Yugoslav Republic of,MK",
    "Madagascar,MG",
    "Malawi,MW",
    "Malaysia,MY",
    "Maldives,MV",
    "Mali,ML",
    "Malta,MT",
    "Marshall Islands,MH",
    "Martinique,MQ",
    "Mauritania,MR",
    "Mauritius,MU",
    "Mayotte,YT",
    "Mexico,MX",
    "Micronesia, Federated States of,FM",
    "Moldova, Republic of,MD",
    "Monaco,MC",
    "Mongolia,MN",
    "Montserrat,MS",
    "Morocco,MA",
    "Mozambique,MZ",
    "Myanmar,MM",
    "Namibia,NA",
    "Nauru,NR",
    "Nepal,NP",
    "Netherlands,NL",
    "Netherlands Antilles,AN",
    "New Caledonia,NC",
    "New Zealand,NZ",
    "Nicaragua,NI",
    "Niger,NE",
    "Nigeria,NG",
    "Niue,NU",
    "Norfolk Island,NF",
    "Northern Mariana Islands,MP",
    "Norway,NO",
    "Oman,OM",
    "Pakistan,PK",
    "Palau,PW",
    "Palestinian Territory, Occupied,PS",
    "Panama,PA",
    "Papua New Guinea,PG",
    "Paraguay,PY",
    "Peru,PE",
    "Philippines,PH",
    "Pitcairn,PN",
    "Poland,PL",
    "Portugal,PT",
    "Puerto Rico,PR",
    "Qatar,QA",
    "Reunion,RE",
    "Romania,RO",
    "Russian Federation,RU",
    "Rwanda,RW",
    "Saint Helena,SH",
    "Saint Kitts and Nevis,KN",
    "Saint Lucia,LC",
    "Saint Pierre and Miquelon,PM",
    "Saint Vincent and the Grenadines,VC",
    "Samoa,WS",
    "San Marino,SM",
    "Sao Tome and Principe,ST",
    "Saudi Arabia,SA",
    "Senegal,SN",
    "Serbia,RS",
    "Seychelles,SC",
    "Sierra Leone,SL",
    "Singapore,SG",
    "Slovakia,SK",
    "Slovenia,SI",
    "Solomon Islands,SB",
    "Somalia,SO",
    "South Africa,ZA",
    "South Georgia and the South Sandwich Islands,GS",
    "Spain,ES",
    "Sri Lanka,LK",
    "Sudan,SD",
    "Suriname,SR",
    "Svalbard and Jan Mayen,SJ",
    "Swaziland,SZ",
    "Sweden,SE",
    "Switzerland,CH",
    "Syrian Arab Republic,SY",
    "Taiwan, Province of China,TW",
    "Tajikistan,TJ",
    "Tanzania, United Republic of,TZ",
    "Thailand,TH",
    "Timor-Leste,TL",
    "Togo,TG",
    "Tokelau,TK",
    "Tonga,TO",
    "Trinidad and Tobago,TT",
    "Tunisia,TN",
    "Turkey,TR",
    "Turkmenistan,TM",
    "Turks and Caicos Islands,TC",
    "Tuvalu,TV",
    "Uganda,UG",
    "Ukraine,UA",
    "United Arab Emirates,AE",
    "United Kingdom,GB",
    "United States,US",
    "United States Minor Outlying Islands,UM",
    "Uruguay,UY",
    "Uzbekistan,UZ",
    "Vanuatu,VU",
    "Venezuela,VE",
    "Viet Nam,VN",
    "Virgin Islands, British,VG",
    "Virgin Islands, U.S.,VI",
    "Wallis and Futuna,WF",
    "Western Sahara,EH",
    "Yemen,YE",
    "Zambia,ZM",
    "Zimbabwe,ZW",
  ];
  
}

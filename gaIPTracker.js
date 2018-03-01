var sampleResponse = {
  name: "Sprinklr, Inc.",
  website: "sprinklr.com",
  employees: "2,500 to 5,000",
  revenue: "$250,000,000 to $500,000,000",
  
  city: "New York",
  regionShort: "NY",
  country: "United States",
  
  sicGroup: "Business Services",
  naicsGroup: "Professional, Scientific, and Technical Services",
  category: "Computer Related Services, Nec",
  category2: "Other Computer Related Services",
  confidence: "77",
  
  
  countryShort: "US",
  cookieId: "97b382ee-7ef5-4fc1-b99b-df88f7eecd90",
  ipAddress: "14.141.149.46",
  street: "29 West 35th Street 8th Floor",
  postal: "10001",
  phone: "917-933-7800",
  sicCode: "7379",
  naicsCode: "541519",
  latitude: 40.7499318,
  longitude: -73.9854829,
  stockSymbol: "",
  facebook: "sprinklr",
  twitter: "sprinklr",
  linkedIn: "399351",
  isISP: "0"
};

var trackerToGAFieldMapper = {
  website: "dimension1",
  name: "dimension2",
  revenue: "dimension3",
  country: "dimension4",
  sicGroup: "dimension5",
};
var mapResponseToGACF = function(response) {
  if (!response) {
    return;
  }
  var trackerKey, trackerValue, GACustomDomain, gaMappingKey;
  var finalGtagMapping = {};

  for (trackerKey in trackerToGAFieldMapper) {
    trackerValue = response[trackerKey];
    gaMappingKey = trackerToGAFieldMapper[trackerKey];
    if (trackerValue && gaMappingKey) {
      finalGtagMapping[gaMappingKey] = trackerValue;
    }
  }

  gtag && gtag("event", "page_view", finalGtagMapping);
  console.log(finalGtagMapping);
};

function sendAJAXReq(){
  $.ajax({
    url: "https://pixel-nqa.sprinklr.com/ip2json",
    jsonp: "$jsonp",
    dataType: "jsonp",  
    success: function( response ) {
      mapResponseToGACF(response)
    }
  });
};

function sendXMLHTTPReq(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://pixel-nqa.sprinklr.com/ip2json");
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        mapResponseToGACF(JSON.parse(xhr.responseText));
      } catch (e) {}
    }
  };
  xhr.send();
}

var init = function() {
  sendXMLHTTPReq();
};

init();

// Data gathered from http://populationpyramid.net/germany/2015/
var universities = [];

function get_category_name(letter) {
    if (letter === "A") return "Human Necessites";
    if (letter === "B") return "Performing Operations; Transporting";
    if (letter === "C") return "Chemistry; Metallurgy";
    if (letter === "D") return "Textiles; Paper";
    if (letter === "E") return "Fixed Constructions";
    if (letter === "F") return "Mechanical Engineering";
    if (letter === "G") return "Physics";
    if (letter === "H") return "Electricity";
    return "Unknow category";
}
    
    function get_selected_value(elm_name) {
        var u1 = document.getElementById(elm_name).selectedIndex;
        
        var x1 = document.getElementById(elm_name).options;
        if (x1[u1]===undefined) {
            return ""
        }
        else {
            return x1[u1].text;
        }
    }

function showChartBarSimple() {
    var categories = [
        'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'
    ];
    var t1 = document.getElementById("ut1").value;
    var t2 = document.getElementById("ut2").value;
    //var t1 = get_selected_value("u1");
    //var t2 = get_selected_value("u2");

    if (!((t1!=="")&&(t2!==""))) {
       t1 = "DANMARKS TEKNISKE UNIVERSITET";
       t2 = "MEDICAL UNIVERSITY OF SOUTH CAROLINA";
       $("#u1").val(t1);
       $("#u2").val(t2);
    }
    var cns = _.map(categories, function(i) {
        return get_category_name(i);
    });

    var data1 = [];
    var data2 = [];   

    $.get("data/uni_pubs.json",function(res){
        $.each(res.data, function(s,sn){
            if ((t1 == sn.normalizedName)) {
                data1.push({cat:sn.Section,nr_pubs:sn.nrPubs});
            }
            if (t2 == sn.normalizedName) {
                data2.push({cat:sn.Section,nr_pubs:sn.nrPubs});
            }
        });

        var da1 = _.map(data1,function(c){return c.cat});
        var da2 = _.map(data2,function(c){return c.cat});

        _.each(categories,function(c){
            if(!_.contains(da1,c)){
                data1.push({cat:c,nr_pubs:0});
            }
            if(!_.contains(da2,c)){
                data2.push({cat:c,nr_pubs:0});
            }
        });
        var d1 = _.sortBy(data1, 'cat').reverse();
        var d2 = _.sortBy(data2, 'cat').reverse();
        
        data1 = _.map(d1,function(d){return d.nr_pubs});
        data2 = _.map(d2,function(d){return d.nr_pubs});
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: t1 + ' vs ' + t2,
            },
            colors: ['#164885', '#ed1c24', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
            subtitle: {
                text: 'Source: LexisNexis IP'
            },
            xAxis: {
                categories:cns,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Publications'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: t1,
                data: data1
    
            }, {
                name: t2,
                data: data2
    
            }]
        });
    });
   
}


function showChartSpider() {
    var categories = [
        'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'
    ];
    var t1 = document.getElementById("ut1").value;
    var t2 = document.getElementById("ut2").value;
    //var t1 = get_selected_value("u1");
    //var t2 = get_selected_value("u2");

    if (!((t1!=="")&&(t2!==""))) {
       t1 = "DANMARKS TEKNISKE UNIVERSITET";
       t2 = "MEDICAL UNIVERSITY OF SOUTH CAROLINA";
       $("#u1").val(t1);
       $("#u2").val(t2);
    }
    var cns = _.map(categories, function(i) {
        return get_category_name(i);
    });

    var data1 = [];
    var data2 = [];

    $.get("data/uni_pubs.json",function(res){
        $.each(res.data, function(s,sn){
            if ((t1 == sn.normalizedName)) {
                data1.push({cat:sn.Section,nr_pubs:sn.nrPubs});
            }
            if (t2 == sn.normalizedName) {
                data2.push({cat:sn.Section,nr_pubs:sn.nrPubs});
            }
        });

        var da1 = _.map(data1,function(c){return c.cat});
        var da2 = _.map(data2,function(c){return c.cat});

        _.each(categories,function(c){
            if(!_.contains(da1,c)){
                data1.push({cat:c,nr_pubs:0});
            }
            if(!_.contains(da2,c)){
                data2.push({cat:c,nr_pubs:0});
            }
        });
        var d1 = _.sortBy(data1, 'cat').reverse();
        var d2 = _.sortBy(data2, 'cat').reverse();
        
        data1 = _.map(d1,function(d){return d.nr_pubs});
        data2 = _.map(d2,function(d){return d.nr_pubs});


        Highcharts.chart('container', {
            chart: {
                polar: true,
                type: 'area'
            },
        
            title: {
                text: t1 + ' vs ' + t2,
                x: -80
            },
        
            pane: {
                size: '80%'
            },
        
            xAxis: {
                categories:cns,
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
        
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
        
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
            },
        
            legend: {
                align: 'right',
                verticalAlign: 'top',
                y: 70,
                layout: 'vertical'
            },
        
            series: [{
                name: t1,
                color: '#164885',
                data: data1,
                pointPlacement: 'on'
            }, {
                name: t2,
                color: '#ed1c24',
                data: data2,
                pointPlacement: 'on'
            }]
        });
    });
}

    
    function showChart(){
        var t1 = document.getElementById("ut1").value;
        var t2 = document.getElementById("ut2").value;

        /*
        var t1 = get_selected_value("u1");
        var t2 = get_selected_value("u2");
        */
    
        if (!((t1!=="")&&(t2!==""))) {
           t1 = "DANMARKS TEKNISKE UNIVERSITET";
           t2 = "MEDICAL UNIVERSITY OF SOUTH CAROLINA";
           $("#u1").val(t1);
           $("#u2").val(t2);
        }

        $("#un1").html(t1);
        $("#un2").html(t2);

        var data1 = [];
        var data2 = [];
    
        // Age categories
        var categories = [
            'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'
        ];
    
        $.get("data/uni_pubs.json",function(res){
            var tot1 = 0;
            var tot2 = 0;
            $.each(res.data, function(s,sn){
                if ((t1 == sn.normalizedName)) {
                    tot1 += sn.nrPubs;
                    data1.push({cat:sn.Section,nr_pubs:sn.nrPubs});
                }
                if (t2 == sn.normalizedName) {
                    data2.push({cat:sn.Section,nr_pubs:sn.nrPubs});
                    tot2 += sn.nrPubs;
                }
            });

            $("#ct1").html(tot1);
            $("#ct2").html(tot2);
            //console.log(tot1, tot2);
    
            var da1 = _.map(data1,function(c){return c.cat});
            var da2 = _.map(data2,function(c){return c.cat});
    
            _.each(categories,function(c){
                if(!_.contains(da1,c)){
                    data1.push({cat:c,nr_pubs:0});
                }
                if(!_.contains(da2,c)){
                    data2.push({cat:c,nr_pubs:0});
                }
            });
            var d1 = _.sortBy(data1, 'cat').reverse();
            var d2 = _.sortBy(data2, 'cat').reverse();
            
            data2 = _.map(d1,function(d){return - d.nr_pubs});
            data1 = _.map(d2,function(d){return d.nr_pubs});
    
        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            colors: ['#164885', '#ed1c24', '#89A54E', '#80699B', '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
            title: {
                text: 'Portfolio Comparison'
            },
            subtitle: {
                text: 'Source: <a href="http://www.lexisnexisip.com" target="_blank">LexisNexis IP</a>'
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                        color: '#000',
                        x: 5,
                        useHTML: true,
                        formatter: function () {
                            return {
                                'A': '<img alt="legal" style="width:30px" src="img/A_HUMAN.png"> ',
                                'B': '<img alt="legal" style="width:30px" src="img/B_TRANSPORTING.jpg"> ',
                                'C': '<img alt="legal" style="width:30px" src="img/C_CHEMISTRY.png">',
                                'D': '<img alt="legal" style="width:30px" src="img/D_TEXTILES.jpg"> ',
                                'E': '<img alt="legal" style="width:30px" src="img/E_FIXEDCONSTRUCTIONS.png"> ',
                                'F': '<img alt="legal" style="width:30px" src="img/F_MECHANICAL.png"> ',
                                'G': '<img alt="legal" style="width:30px" src="img/G_PHYSICS.png"> ',
                                'H': '<img alt="legal" style="width:30px" src="img/H_ELECTRICITY.png"> '
                            }[this.value];
                        }
                    }
            }, {
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) + '';
                    }
                }
            },
    
            plotOptions: {
                series: {
                    stacking: 'normal', pointWidth: 32
                }
            },
    
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', ' + get_category_name(this.point.category) + '</b><br/>' +
                        'Patents: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },
    
            series: [{
                name: t1,
                data: data2
            }, {
                name: t2,
                data: data1
            }]
        });
        });
        copy_url();
    }
    
        function getUrlVars() {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                vars[key] = value;
            });
            return vars;
        }
    
        function getUrlParam(parameter, defaultvalue){
            var urlparameter = defaultvalue;
            if(window.location.href.indexOf(parameter) > -1){
                urlparameter = getUrlVars()[parameter];
                }
            return urlparameter;
        }
    
        function copy_url() {
            var url = "https://paulopaixao.github.io/academia/index.html?";
            
            var t1 = document.getElementById("ut1").value;
            var t2 = document.getElementById("ut2").value;
            //var t1 = get_selected_value("u1");
            //var t2 = get_selected_value("u2");
    
            url += "uni1=" + encodeURIComponent(t1);
            url += "&uni2=" + encodeURIComponent(t2);
            $("#foo").val(url);
            return url;
        }
        var substringMatcher = function(strs) {
            return function findMatches(q, cb) {
              var matches, substringRegex;
          
              // an array that will be populated with substring matches
              matches = [];
          
              // regex used to determine if a string contains the substring `q`
              substrRegex = new RegExp(q, 'i');
          
              // iterate through the pool of strings and for any string that
              // contains the substring `q`, add it to the `matches` array
              $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                  matches.push(str);
                }
              });
          
              cb(matches);
            };
          };


        $(document).ready(function(){
            var t1 = document.getElementById("ut1").value;
            var t2 = document.getElementById("ut2").value;
            if (t1 == "") {
               document.getElementById("ut1").value = "DANMARKS TEKNISKE UNIVERSITET";
            }
            if (t2 == "") {
                document.getElementById("ut2").value = "MEDICAL UNIVERSITY OF SOUTH CAROLINA";
            }
            var urlt1 = getUrlParam("uni1");
            var urlt2 = getUrlParam("uni2");
            if (urlt1 && urlt2) {
                document.getElementById("ut1").value = decodeURIComponent(urlt1);
                document.getElementById("ut2").value = decodeURIComponent(urlt2);
            }




            $.get("data/unis.json",function(r){
                var sd = _.sortBy(r.data, 'normalizedName');
                var university_names = _.map(sd, function(item) {return item.normalizedName } );
              
               var states = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: university_names
              });
               
                $('.typeahead').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                {
                    name: 'states',
                    source: states
                });

                showChart();
            });

            new ClipboardJS('.btn');
            var bgs = ["img/alejandro-escamilla-22-unsplash.jpg" ,"img/becca-tapert-391599-unsplash.jpg","img/markus-petritz-135033-unsplash.jpg","img/malte-baumann-82231-unsplash.jpg","img/michael-d-beckwith-754271-unsplash.jpg", "img/priscilla-du-preez-293218-unsplash.jpg","img/priscilla-du-preez-623040-unsplash.jpg"];
            var item = bgs[Math.floor(Math.random()*bgs.length)];
            $("#backgd").attr("src",item)
        });
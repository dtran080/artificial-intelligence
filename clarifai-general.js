<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script>
</head>
<body>

<div align="center">

<h1>General Model</h1>

    <input id="inputFileToLoad" type="file" onchange="encodeImageFileAsURL();" accept=".jpg,.png"/>
    <div id="imgTest"></div>


    <script type='text/javascript'>

        function encodeImageFileAsURL() {

            var filesSelected = document.getElementById("inputFileToLoad").files;



            if (filesSelected.length > 0) {


                var fileToLoad = filesSelected[0];

                var fileReader = new FileReader();

                fileReader.readAsDataURL(fileToLoad);

                fileReader.onload = function(fileLoadedEvent) {
                    var srcData = fileLoadedEvent.target.result; // <--- data: base64

                    var newImage = document.createElement('img');
                    newImage.src = srcData;
                    newImage.setAttribute("id","uploadedImage");

                    document.getElementById("imgTest").innerHTML = newImage.outerHTML;
                    predictFeatures(document.getElementById("uploadedImage").getAttribute("src"));
                }


            }


        }


        function predictFeatures(base64Url){


            base64Url = base64Url.split(',')[1];

            var app = new Clarifai.App(
                'CLIENTID',
                'CLIENTSECRET'
            );

                // predict the contents of an image by passing in a url
            app.models.predict(Clarifai.GENERAL_MODEL,{'base64': base64Url}).then(
                function(response) {

                    for(var i=0;i<20;i++) {
                        console.log(response['rawData']['outputs'][0]['data']['concepts'][i]['name']);
                    }
                },
                function(err) {
                    console.error(err);
                }
            );
        }



    </script>

</div>

</body>
</html>

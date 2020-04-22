// This is a simple demo script, feel free to edit or delete it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence( "welcome" , randomize("experiment") , "send" , "final" )

newTrial( "welcome" ,
    defaultText
        .print()
    ,
    newText("<p>Welcome!</p>")
    ,
    newText("<p>In this experiment, you will hear a sound and decide if it sounds more like one word or another.</p>")
    ,
    newText("<p>Press the <strong>F</strong> key for the word on the left, or the <strong>J</strong> key for the word on the right.</p>")
    ,
    newText("<p>Please enter your ID and then click the button below to start the experiment.</p>")
    ,
    newButton("Start")
        .print()
        .wait()
)
.log( "ID" , GetURLParameter( "id" ))


Template( variable =>
    newTrial("experiment" ,
        newTimer(500)
            .start()
            .wait()
    ,
        newImage("stimuli",variable.Face_pic)
            .size(300,250)
    ,
        newCanvas(450,100)
            .add(   170 , 0 , getImage("stimuli") )
            .print()
        ,
    
    
        newAudio(variable.Audio)
        .play()
    ,
        newText("two", variable.Text_two)
        .settings.css("font-size", "600%")
    ,
        newText("one", variable.Text_one)
        .settings.css("font-size", "600%")
    ,
        newCanvas(650,200)
        .add(   0 , 300 , getText("one") )
        .add( 470 , 300 , getText("two") )
        .print()
    ,
        
        newSelector()
            .add( getText("one") , getText("two") )
            .keys(          "F"    ,          "J"   )
            .log()
            .wait()
            
        ,
        newTimer(500)
            .start()
            .wait()
      )
    .log( "ID"     , getVar("ID")    )
    .log( "VC"   , variable.VC   )
    .log( "Step" , variable.Step )
    .log( "Face"  , variable.Face  )

)

SendResults( "send" )

newTrial( "final" ,
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://www.pcibex.net/' href='_blank'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)
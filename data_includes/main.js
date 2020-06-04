PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence( "welcome" , randomize("experiment") , "send" , "final" )

newTrial( "welcome" ,
    defaultText
        .print()
    ,
    newVar("ID")
        .global()
        .set( GetURLParameter("id"))
    ,
    newText("<p>Welcome!</p>")
    ,
    newText("<p>In this experiment, you will hear a sound and decide if it sounds more like one word or another.</p>")
    ,
    newText("<p>Press the <strong>F</strong> key for the word on the left, or the <strong>J</strong> key for the word on the right.</p>")
    ,
    newText("<p>Please click the button below to start the experiment.</p>")
    ,
    newButton("Start")
        .print()
        .wait()
)
.log( "ID" , getVar("ID") )

Template( variable =>
    newTrial("experiment" ,
        newTimer(500)
            .start()
            .wait()
    ,
        newImage("stimuli",variable.Face_pic)
            .size(300,250)
    ,
        newCanvas("face", 450, 100)
            .add(   170 , 0 , getImage("stimuli") )
            .print()
    ,
        newText("two", variable.Text_two)
        .settings.css("font-size", "600%")
    ,
        newText("one", variable.Text_one)
        .settings.css("font-size", "600%")
    ,
        newText("instructions", "<p>Press <strong>F</strong> for left, or <strong>J</strong> for right.</p>")
        .settings.css("font-size", "150%")
    ,
        newCanvas("words", 650, 200)
        .add(   0, 300, getText("one"))
        .add( 470, 300, getText("two"))
        .add( 235, 500, getText("instructions"))
        .print()
    ,
        newAudio("wav", variable.Audio)
        .once()
        .print()
        .play()
    ,
        newSelector()
            .disableClicks()
            .add( getText("one") , getText("two") )
            .keys(          "F"    ,          "J"   )
            .log()
            .wait()
      )
    .log( "ID" , getVar("ID"))
    .log( "VC"   , variable.VC   )
    .log( "Step" , variable.Step )
    .log( "Face"  , variable.Face  )
    .log( "Group" , Group.variable  )
)

SendResults( "send" )

newTrial( "final" ,
    exitFullscreen()
    ,
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://www.pcibex.net/' href='_blank'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
)

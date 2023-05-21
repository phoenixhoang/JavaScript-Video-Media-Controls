//Phoenix Hoang 19043363 5th Dec 2019

/*event listener to listen for when the browser window/ HTML document has fully loaded and calls 
initialisedWebpage function*/
document.addEventListener ("DOMContentLoaded", initialiseWebPage); 

//initialisedWebPage function
function initialiseWebPage()
{
	//-------------------- Pause/ Unpause --------------------
	
	//creates an identity and selects the video
	const mmuVideo = document.querySelector("video");
	
	//creates an identity for the play button handler
	const playButton = document.getElementById("playPause");
	
	//listening for a click on the play button which then calls the togglePlayMmuVideo function
	playButton.addEventListener("click", togglePlayMmuVideo);
	
	//togglePlayVideo function
	function togglePlayMmuVideo()
	{
		//if the video is paused and the button has been clicked
		if (mmuVideo.paused === true)
		{
			//method to play the video is used
			mmuVideo.play();
			//change button symbol to pause
			playButton.innerHTML = "&#10074;&#10074;";
		}//end if
		
		//else if the button has been clicked
		else 
		{
			//method to pause the video is used
			mmuVideo.pause();
			//change button symbol to play
			playButton.innerHTML = "&#x25BA;";
		}//end else
			
	}//end togglePlayVideo function

	//-------------------- Mute/ Unmute --------------------

	//Set default video volume to half
	mmuVideo.volume = 0.5;

	//mute button handler
	const muteButton = document.getElementById("muteUnmute");
	
	//listening for a click on the mute button which then calls the toggleMuteVideo function
	muteButton.addEventListener("click", toggleMuteMmuVideo);
	
	//toggleMuteVideo function
	function toggleMuteMmuVideo()
	{
		//if the video is muted and the button is clicked
		if (mmuVideo.muted === true)
		{
			//change property muted to false
			mmuVideo.muted = false;
			//change video volume to 0.5
			mmuVideo.volume = 0.5;
			//change button text to mute
			muteButton.innerHTML = "Mute";
			//moves volume slider to half way
			volumeSlider.value = 5;
		}// end if
		
		//else the video is unmuted 
		else
		{
			//change property muted to true
			mmuVideo.muted = true;
			//change video volume to 0.5
			mmuVideo.volume = 0;
			//change button text to mute
			muteButton.innerHTML = "Unmute";
			//moves volume slider to 0
			volumeSlider.value = 0;
		}//end else
		
	}//end toggleMuteVideo function

	//-------------------- Seek Bar Scrub --------------------
	
	//scrub slider bar handler
	const scrubSlider = document.getElementById("seekBar");
	
	//listening for an input on the scrub slider which then calls for the scrubMmuVideo function
	scrubSlider.addEventListener ("input", scrubMmuVideo);
	
	//scrubbing video function
	function scrubMmuVideo()
	{
		//scrubTime is the progress across the slider bar
		const scrubTime = mmuVideo.duration * (scrubSlider.value / 100);
		//video current time is equal to the constant scrubTime
		mmuVideo.currentTime = scrubTime;
	}//end scrubMmuVideo function
	
	//listening for the currentTime attribute to be updated which then calls movePlaySlider function
	mmuVideo.addEventListener ("timeupdate", movePlaySlider)
	
	//moving video scrub slider function
	function movePlaySlider()
	{
		//value of scrubSlider is current time over duration * 100 as max value of slider is 100
		scrubSlider.value = (mmuVideo.currentTime/mmuVideo.duration) * 100;
		
	}//end movePlaySlider function
	
	//-------------------- Volume Bar --------------------
	
	//volume slider bar handler
	const volumeSlider = document.getElementById("volumeBar");
	//volume number display handler
	const volumeNumberDisplay = document.getElementById("displayVolumeValue");
	
	//listening for an input on the volume slider which then calls the changeMmuVideoVolume function
	volumeSlider.addEventListener ("input", changeMmuVideoVolume);
	
	//mmu video volume changer function
	function changeMmuVideoVolume()
	{	
		//volume depends on the value of the volume slider which is between 0 to 10 
		mmuVideo.volume = (volumeSlider.value / 10);
		
		//if the video volume is 0, the video is muted
		if (mmuVideo.volume === 0)
		{
			//changes muted property to true
			mmuVideo.muted = true;
			//change mute button text to unmute
			muteButton.innerHTML = "Unmute";
			//volume number displayed becomes 0
			volumeNumberDisplay.innerHTML = "0";
		}//end if
		
		//else the video isn't muted
		else
		{
			//changes muted property to false
			mmuVideo.muted = false;
			//change mute button text to mute
			muteButton.innerHTML = "Mute";
	
		//displays the volume number which depends on the value of the volume bar
		volumeNumberDisplay.innerHTML = volumeBar.value;
		
		}//end else
			
	}//end changeMmuVideoVolume function

	//-------------------- Display Current Time --------------------
	
	//video current time handler
	const mmuVideoCurrentTime = document.getElementById("displayMmuVideoCurrentTime");
	//video remaining time handler
	const mmuVideoRemainingTime = document.getElementById("displayMmuVideoRemainingTime")
	
	//listening for currentTime attribute to be updated which then calls the displayMmuVideoTime function
	mmuVideo.addEventListener("timeupdate", displayMmuVideoTime);
	
	//display the video current and remaining time function
	function displayMmuVideoTime()
	{
		//variable minutes is current time divided by 60 to give the quotient
		let minutes = Math.floor(mmuVideo.currentTime / 60);
		//variable seconds is the current time mod 60 to give the remainder
		let seconds = Math.floor(mmuVideo.currentTime % 60);
		
		//if minutes is less than 10
		if (minutes < 10)
		{
			//0 is placed in front of the minutes to make the value format double digits
			minutes = "0" + minutes;
		}//end if
		
		//if seconds is less than 10
		if (seconds < 10)
		{
			//0 is placed in front of the seconds to make the value format double digits
			seconds = "0" + seconds;
		}//end if

		//video current time is the variable minutes and seconds with a colon between for formatting
		mmuVideoCurrentTime.innerHTML = minutes + ":" + seconds;

		//variable minutesRemaining is duration minus current time all divided by 60 to give the quotient
		let minutesRemaining = Math.floor((mmuVideo.duration - mmuVideo.currentTime) / 60);
		////variable secondsRemaining is the duration minus current time all mod 60 to give the remainder
		let secondsRemaining = Math.floor((mmuVideo.duration - mmuVideo.currentTime) % 60);
		
		//if the minutes remaining is less than 10
		if (minutesRemaining < 10)
		{
			//0 is placed in front of the minutes to make the value format double digits
			minutesRemaining = "0" + minutesRemaining;
		}//end if 
		
		//if the seconds remaining is less than 10 
		if (secondsRemaining < 10)
		{
			//0 is placed in front of the seconds to make the value format double digits
			secondsRemaining = "0" + secondsRemaining;
		}//end if

		//video remaining time is minutesRemaining and secondsRemaining with  colon between for formatting
		mmuVideoRemainingTime.innerHTML = minutesRemaining + ":" + secondsRemaining;

	}//end displayMmuVideoTime dunction
	
	//-------------------- Playback Speed --------------------
	
	//default playback rate is set to 1
	mmuVideo.playbackRate = 1;
	
	//current playback speed handler
	const currentPlaybackSpeed = document.getElementById("playbackSpeedSelector");
	
	//listening for an input on the playbackSpeedChoice list which then calls the changePlaybackSpeed function
	playbackSpeedChoice.addEventListener("input", changePlaybackSpeed);
	
	//changing video playback speed function
	function changePlaybackSpeed()
	{
		//if the playbackSpeedChoice value on the data list is 0.5
		if (playbackSpeedChoice.value == 0.5)
		{
			//video playback rate is 0.5 which is half of the regular speed and slows the video down
			mmuVideo.playbackRate = 0.5;
		}//end if
		
		//else if the playbackSpeedChoice value on the data list is 0.75
		else if (playbackSpeedChoice.value == 0.75)
		{
			//video playback rate is the regular speed * 0.75 which slows the video down
			mmuVideo.playbackRate = 0.75;
		}//end else if
		
		//else if the playbackSpeedChoice value on the data list is 1
		else if (playbackSpeedChoice.value == 1)
		{
			//video playback rate is the regular speed
			mmuVideo.playbackRate = 1;
		}//end else if
		
		//else if the playbackSpeedChoice value on the data list is 1.25
		else if (playbackSpeedChoice.value == 1.25)
		{
			//video playback rate is the regular speed * 1.25 which speeds the video up
			mmuVideo.playbackRate = 1.25;
		}//end else if
		
		//else if the playbackSpeedChoice value on the data list is 1.5
		else if (playbackSpeedChoice.value == 1.5)
		{
			//video playback rate is the regular speed * 1.5 which speeds the video up
			mmuVideo.playbackRate = 1.5;
		}//end else if
		
		//else if the playbackSpeedChoice value on the data list is 1.75
		else if (playbackSpeedChoice.value == 1.75)
		{
			//video playback rate is the regular speed * 1.75 which speeds the video up
			mmuVideo.playbackRate = 1.75;
		}//end else if
		
		//else if the playbackSpeedChoice value on the data list is 2
		else if (playbackSpeedChoice.value == 2)
		{
			//video playback rate is 2 which is double the regular speed and speeds the video up
			mmuVideo.playbackRate = 2;
		}//end else if
		
		//else 
		else
		{
			//video is the default regular speed
			mmuVideo.playbackRate = 1;
		}//end else
		
	}//end changePlaybackSpeed function
	
	//------------------- Visibility --------------------
	
	/*video visibility handler listening for a visibiity change throughout the document which then calls the 
	handleTabVisilibityChange function*/
	const mmuVideoVisibility = document.addEventListener("visibilitychange", handleTabVisibilityChange);

	//hidden is the visibility change
	let hidden, visibilityChange; 
	
	//if the typeof document.hidden is not undefined
	if (typeof document.hidden !== "undefined") 
	{ 
		//variable hidden is hidden
	  	hidden = "hidden";
	  	//visbility change event is used
		visibilityChange = "visibilitychange";
	}//end if

	//handling the tab visibility change function
	function handleTabVisibilityChange() 
	{
		//if the document is hidden (true)
		if (document[hidden]) 
		{
			//method to pause the video is used
			mmuVideo.pause();
			//change button symbol to play
			playButton.innerHTML = "&#x25BA;";
	 	}//end if
		
		//else
		else 
		{
			//method to play the video is used
			mmuVideo.play();
			//change button symbol to pause
			playButton.innerHTML = "&#10074;&#10074;";
	  	}//end else
	}//end handleTabVisibilityChange function

	//-------------------- Shortcuts --------------------
	
	/*video shortcut handler listening for a keydown keyboard eveent throughout the document which then calls
	the pressShortcutKeys function*/
	const handleMmuVideoShortcuts = document.addEventListener('keydown', pressShortcutKeys);
	
	//handling shortcut keys
	function pressShortcutKeys(e)
	{
		//switch statement to evaluate expression of key cases
		switch (e.key)
		{
			//if the key down is the any of the following "ArrowUp", "W" or "w" keys
			case "ArrowUp":
			case "W":
			case "w":
				
				//if the video volume is less than 1
				if (mmuVideo.volume < 1)
				{
					//volume value increased by 0.1 
					mmuVideo.volume += 0.1;
					//multiply the video volume value by 10 to make the slider increase in increments of 1
					volumeSlider.value = mmuVideo.volume * 10;
					//displays the volume number which depends on the value of the volume bar
					volumeNumberDisplay.innerHTML = volumeSlider.value;
				}//end if
				
				//else
				else{
					//the volume value stays as 1 since it can't increase above 1
					mmuVideo.volume = 1;
					//the value of the slider stays as 1 since it can't increase above 1
					volumeSlider.value = 1;
					//displays the volume number which depends on the value of the volume bar
					volumeNumberDisplay.value = volumeSlider.value;
				}//end else
			
			//break state to terminate the current loop of switch
			break;
			
			//if the key down is the any of the following "ArrowDown", S" or "s" keys
			case "ArrowDown":
			case "S":
			case "s":

				//if the video volume is more than 0
				if (mmuVideo.volume > 0)
				{	
					//volume value is decreased by 0.1
					mmuVideo.volume -= 0.1;
					//multiply the video volume value by 10 to make the slider decrease in increments of 1
					volumeSlider.value = mmuVideo.volume * 10;
					//displays the volume number which depends on the value of the volume bar
					volumeNumberDisplay.innerHTML = volumeSlider.value;
				}//end if
				
				//else
				else
				{
					//the volume value stays as 0 since it can't decrease below 0
					mmuVideo.volume = 0;
					//the volume value stays as 1 since it can't decrease below 0
					volumeSlider.value = 0;
					//displays the volume number which depends on the value of the volume bar
					volumeNumberDisplay.value = volumeSlider.value;
				}//end else

			//break state to terminate the current loop of switch
			break;

			//if the key down is the any of the following "ArrowLeft", "A" or "a" keys
			case "ArrowLeft":
			case "A":
			case "a":

				//if the current time is above 0
				if (mmuVideo.currentTime > 0)
				{
					//the current video time is decreased by 10 seconds
					mmuVideo.currentTime -= 10;
					//the scrub slider value is decreased by 10 seconds by current time plus (duration / 10)
					scrubSlider.value = mmuVideo.currentTime - (mmuVideo.duration / 10);
					//remaining time is the scrub slider value 
					mmuVideoRemainingTime.value = scrubSlider.value;
				}//end if

			//break state to terminate the current loop of switch
			break;
			
			//if the key down is the any of the following "ArrowRight", "D" or "d" keys
			case "ArrowRight":
			case "D":
			case "d":
			
				//if the video duration is more than the current time
				if (mmuVideo.duration > mmuVideo.currentTime)
				{
					//the current video time is increased by 10 seconds
					mmuVideo.currentTime += 10;
					//the scrub slider value is decreased by 10 seconds by current time minus (duration / 10)
					scrubSlider.value = mmuVideo.currentTime + (mmuVideo.duration / 10);
					//remaining time is the scrub slider value 
					mmuVideoRemainingTime.value = scrubSlider.value;
				}//end if

			//break state to terminate the current loop of switch
			break;
			
			//if the key down is the any of the following "M" or "m" keys
			case "M":
			case "m":
				
				//if the video is paused and the button has been pressed
				if (mmuVideo.muted === true)
				{
					//change variable muted to false
					mmuVideo.muted = false;
					//change video volume to 0.5
					mmuVideo.volume = 0.5;
					//change button text to mute
					muteButton.innerHTML = "Mute";
					//moves volume slider to half way
					volumeSlider.value = 5;
				}
					
				//else the video is playing and the button has been pressed
				else
				{
					//change variable muted to false
					mmuVideo.muted = true;
					//change video volume to 0.5
					mmuVideo.volume = 0;
					//change button text to mute
					muteButton.innerHTML = "Unmute";
					//moves volume slider to 0
					volumeSlider.value = 0;
				}//end else

			//break state to terminate the current loop of switch
			break;
			
			//if the key down is the any of the following "P" or "p" keys
			case "P":
			case "p":
					
			//if the video is paused and the button has been clicked
			if (mmuVideo.paused === true)
			{
				//method to play the video
				mmuVideo.play();
				//change button symbol to pause
				playButton.innerHTML = "&#10074;&#10074;";
			}//end if

			//else if the button has been clicked
			else 
			{
				//method to pause the video
				mmuVideo.pause();
				//change button symbol to play
				playButton.innerHTML = "&#x25BA;";
			}//end else

		}
	}		
}//closes initialiseWebPage function
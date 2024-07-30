class SettingsHandler {
    constructor(Main) {
      this.body = document.getElementById("body");
      this.main = Main;
      this.asteroidFrequency = 50;
    }
    displaySettings() {
        this.backButton = document.createElement("button");
        this.backButton.innerText = "back";
        this.backButton.id = "back";
        this.Settings = document.createElement("h1");
        this.Settings.className = "title";
        this.Settings.id = "title";
        this.Settings.innerText = "Settings";
        this.body.appendChild(this.Settings);
        this.setting = document.createElement("p");
        this.setting.id = "AsteroidFrequency";
        this.setting.innerText = "Asteroid Frequency";
        this.body.appendChild(this.setting);
  
        // create the asteroid frequency slider
        this.sliderContainer = document.createElement("div");
        this.sliderContainer.id = "sliderContainer";
        this.slider = document.createElement("input");
        this.slider.id = "slider";
        this.slider.type = "range";
        this.slider.min = "1";
        this.slider.max = "100";
        this.body.append(this.sliderContainer);
        this.sliderContainer.appendChild(this.slider);
  
        // display the current asteroid frequency
        this.freq = document.createElement("p");
        this.freq.id = "AsteroidFrequency";
        this.freq.innerText = this.asteroidFrequency;
        this.body.append(this.freq);
        this.slider.oninput = () => {
            this.freq.innerText = this.slider.value;
            this.asteroidFrequency = this.slider.value;
        };

        this.body.append(this.backButton);
        this.backButton.onclick = () => this.removeSettings();
    }
    removeSettings() {
        document.getElementById("AsteroidFrequency").remove();
        document.getElementById("title").remove();
        document.getElementById("sliderContainer").remove();
        document.getElementById("back").remove();
        document.getElementById("AsteroidFrequency").remove();
        this.main.renderMain();
    }
  }
  
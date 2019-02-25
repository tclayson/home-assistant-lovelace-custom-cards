# Transport Card for Lovelace

This custom card will display in the form of a "transport card" with the ability to highlight rows with different colours and fonts. Additionally, where the sensor format is `HH:mm` (24 hour) each row in the card can also display the number of minutes to that time.

## Configuration

Download transport-card.js and upload it to your Home Assistant's `/config/www` directory. If this directory doesn't already exist go ahead and create it. The `www` directory stores files for Home Assistant's built in web server. This means your files will be available at `https://yourip/local/...` or `https://yourdomain.duckdns.org/local/...`.

Once uploaded navigate to your Lovelace configuration and insert a new resource. If you are editing Lovelace in the browser then start "Configure UI" from the menu and then open the menu again and select "Raw config editor". If you are editing Lovelace using YAML then you can do this in your YAML file.

```YAML
resources:
  - type: js
    url: /local/transport-card.js
```

Now you can create some cards. This is the minimum YAML required to create a Transport Card:

```YAML
entities:
  - sensor.next_train
  - sensor.next_bus
title: Trains
type: 'custom:transport-card'
```

This will simply display the two entites on top of each other like this:

![](https://imgur.com/a/jg1oCOD.jpg)

However you can customise each entity row with colours and icons to create illustrative views of your upcoming transport:

```YAML
entities:
  - color: '#FFBFC0'
    entity: sensor.next_train
    name: Next Train
    font_color: '#F61E1C'
    icon: 'mdi:train'
    show_mins: true
  - entity: sensor.second_train
    name: Second
  - entity: sensor.third_train
    name: Third
  - color: '#FEFFBF'
    entity: sensor.next_bus
    font_color: '#119DD4'
    icon: 'mdi:bus-clock'
    show_mins: true
    name: Next bus
  - entity: sensor.second_bus
    name: Second
  - entity: sensor.third_bus
    name: Third
title: Trains
type: 'custom:transport-card'
```

This will render like this:

![](https://imgur.com/RvnfFBJ.jpg)

You can add any entities to this card - the current state will be shown on the right hand side where the times are in my examples above. However, to use the `show_mins` option the sensor has to be formatted as `HH:mm` in 24 hour time.

Please feel free to submit pull requests or send requests for new features.

Enjoy!

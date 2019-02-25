class TransportCard extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      card.header = 'Transport Card';

      // Has another header been set?
      if(typeof this.config.title === 'string') {
        card.header = this.config.title;
      }

      this.content = document.createElement('div');
      this.content.style.padding = '0 0 16px';
      card.appendChild(this.content);
      this.appendChild(card);
    }

    const entities = this.config.entities;

    var renders = [];

    for(var i = 0; i < entities.length; i++) {
      let entity = entities[i];

      let entityId;
      
      let color;
      let icon;
      let font_color;
      let show_mins = false;
      let mins;
      let name;

      if(typeof entity === "object") {
        entityId = entity.entity;

        if(typeof entity.color === 'string') {
          color = entity.color;
        }

        if(typeof entity.icon === 'string') {
          icon = entity.icon;
        }

        if(typeof entity.font_color === 'string') {
          font_color = entity.font_color;
        }

        if(typeof entity.show_mins === 'boolean') {
          show_mins = entity.show_mins;
        }

        if(typeof entity.name === 'string') {
          name = entity.name;
        }
      }
      else {
        entityId = entity;
      }

      let stateObj = hass.states[entityId];

      if(show_mins) { // ASSUMING 24 HOUR TIME
        let trainTime = stateObj.state.split(':');
        let now = new Date();
        
        let nowTime = [
          now.getHours(),
          now.getMinutes()
        ];

        // check if train is tomorrow by checking if the train HOURS element is less than the current hours element
        if(trainTime[0] < nowTime[0]) {
          trainTime[0] = trainTime[0] + 24;
        }

        let diffHours = trainTime[0] - nowTime[0];

        mins = (diffHours * 60) + (trainTime[1] - nowTime[1]);
      }

      renders.push(`
        <div class="transport-row" style="${color ? `background-color: ${color};` : ``}${font_color ? `color: ${font_color};` : ``}">
          <div class="transport-icon">${icon ? `<ha-icon icon="${icon}"></ha-icon>` : `` }</div>
          <div class="transport-name">${name ? name : stateObj.attributes.friendly_name}</div>
          <div class="transport-mins" style="${mins ? `border: 2px solid ${font_color ? `${font_color};` : `#000`}` : ``}">${mins ? `${mins}` : ``}</div>
          <div class="transport-time">${stateObj.state}</div>
        </div>
      `);
    }

    this.content.innerHTML = `
      <style>
        .transport-row {
          padding: 16px;
          display: flex;
        }

        .transport-row div.transport-name,
        .transport-row div.transport-mins,
        .transport-row div.transport-time {
          line-height: 24px;
        }

        .transport-row div.transport-mins {
          margin-left: auto;
          border: none;
          border-radius: 50%;
          padding: 0 6px;
          font-size: 70%;
        }

        .transport-row div:last-child {
          padding-left: 10px
        }

        .transport-icon {
          flex: 0 0 40px
        }
      </style>
      ${renders.join('')}
    `;
  }

  setConfig(config) {
    if (!config.entities) {
      throw new Error('You need to define entities');
    }
    this.config = config;
  }

  getCardSize() {
    return this.config.entities.length + 1;
  }
}

customElements.define('transport-card', TransportCard);








import React from 'react';

class EventInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventItems: []
    };
  }

  createEventItems(events) {
    const eventItems = events.map((event, i) => {
      const key = `event-item-${i}`
      return (
        <div className="EventItem" key={key}>
          <h1>{event.installer}</h1>
          <p>{event.address}</p>
          <p>Start: {event.installStart} / End: {event.installEnd}</p>
        </div>
      )
    });

    return eventItems;
  }

  componentWillMount() {
    this.setState({
      eventItems: this.createEventItems(this.props.events)
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      eventItems: this.createEventItems(nextProps.events)
    });
  }

  render() {
    return (
      <ul className="EventInfo">
        {this.state.eventItems}
      </ul>
    )
  }
}

export default EventInfo;

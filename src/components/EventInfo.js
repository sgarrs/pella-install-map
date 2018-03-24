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
          <h1>Install Info:</h1>
          <p>{event.installer}</p>
          <div>
            <span>Event Times:</span>
            <ul>
              <li>Start: {event.installStart}</li>
              <li>End: {event.installEnd}</li>
            </ul>
          <p>Task Status: {event.taskStatus}</p>
          </div>
          <h1>Job Info:</h1>
          <p>Net Price: {event.netPrice}</p>
          <p>Order #: {event.orderNumber}</p>
          <p>Quote #: {event.quoteNumber}</p>
          <p>Sales Rep: {event.salesRep}</p>
          <h1>Customer Info:</h1>
          <p>{event.customerName}</p>
          <p>{event.address}</p>
          <div>
            <span>Contact:</span>
            <ul>
              <li>Phone: {event.phone}</li>
              <li>Email: {event.email}</li>
            </ul>
          </div>
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

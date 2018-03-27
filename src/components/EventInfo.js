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
          <div>
            <h1>Install Info:</h1>
            <p>{event.installer}</p>
            <ul>
              <li>Start: {event.installStart}</li>
              <li>End: {event.installEnd}</li>
            </ul>
            <p>Task Status: {event.taskStatus}</p>
          </div>
          <div>
            <h1>Order Info:</h1>
            <ul>
              <li>Net Price: {event.netPrice}</li>
              <li>Order #: {event.orderNumber}</li>
              <li>Quote #: {event.quoteNumber}</li>
              <li>Sales Rep: {event.salesRep}</li>
            </ul>
          </div>
          <div>
            <h1>Customer Info:</h1>
            <p>{event.customerName}</p>
            <p>{event.address}</p>
            <div>
              <ul>
                <li>Phone: {event.phone}</li>
                <li>Email: {event.email}</li>
              </ul>
            </div>
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

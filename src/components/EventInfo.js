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
      if (event !== undefined) {
        return (
          <div className="EventItem" key={key}>
            <h2 className={"event__status " + (event.taskStatus === "Scheduled" ? "event__status--scheduled" : "event__status--other")}>
              {event.taskStatus}
            </h2>
            <h1 className="event__address">{event.address}</h1>
            <p className="event__installer"><span>Crew: </span>{event.installer}</p>
            <p className="event__times">
              <span className="event__times--start">Start: </span>{event.installStart} — <span className="event__times--end">End: </span>{event.installEnd}
            </p>
            <p className="event__sales-rep"><span>Sales Rep: </span>{event.salesRep}</p>
            <p className="event__order">
              <span className="event__order--order">Order #: </span>{event.orderNumber} — <span className="event__order--quote">Quote #: </span>{event.quoteNumber}
            </p>
            <p className="event__net-price"><span>Net Price: </span>{event.netPrice}</p>
            <p className="event__customer"><span>Customer: </span>{event.customerName}</p>
            <p className="event__phone"><span>Phone: </span>{event.phone}</p>
            <p className="event__email"><span>Email: </span>{event.email}</p>
          </div>
        )
      } else {
        return undefined;
      }
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

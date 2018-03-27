function Marker(data) {
  const customerName = data['Customer Name'];
  const email = data['Email Address'];
  const phone = data['Phone #'];
  const customerEvent = data['Customer Event'];
  const taskStatus = data['Task Status'];
  const installer = data['Install Crew'];
  const installStart = data['Install Start Date'];
  const installEnd = data['Install End Date'];
  const quoteNumber = data['Quote #'];
  const orderNumber = data['Pqm Order Number'];
  const salesRep = data['Sales Rep'];

  function getAddress() {
    return data['Address 1'] + ', ' + data.City + ', ' + data.State + ', ' + data['Postal Code'];
  }

  function getBranch() {
    return data.Branch.substring(0, 3);
  }

  function getPrice() {
    const price = data['Net Price'];
    if (price.length > 3) {
      return '$' + price.substring(0, price.length - 3) + ',' + price.substring(price.length - 3) + '.00'
    } else {
      return '$' + price + '.00'
    }
  }

  return {
    address: getAddress(),
    customerName: customerName,
    email: email,
    phone: phone,
    customerEvent: customerEvent,
    taskStatus: taskStatus,
    installer: installer,
    installStart: installStart,
    installEnd: installEnd,
    branch: getBranch(),
    quoteNumber: quoteNumber,
    orderNumber: orderNumber,
    netPrice: getPrice(),
    salesRep: salesRep,
  }
}

module.exports = Marker;

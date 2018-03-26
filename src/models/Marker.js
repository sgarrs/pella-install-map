function Marker(data) {
  this.customerName = data['Customer Name'];
  this.email = data['Email Address'];
  this.phone = data['Phone #'];
  this.customerEvent = data['Customer Event'];
  this.taskStatus = data['Task Status'];
  this.installer = data['Install Crew'];
  this.installStart = data['Install Start Date'];
  this.installEnd = data['Install End Date'];
  this.quoteNumber = data['Quote #'];
  this.orderNumber = data['Order Number'];
  this.salesRep = data['Sales Rep'];

  this.getAddress = function getAddress() {
    return data['Address 1'] + ', ' + data.City + ', ' + data.State + ', ' + data['Postal Code'];
  }

  this.getBranch = function getBranch() {
    return data.Branch.substring(0, 3);
  }

  this.getPrice = function getPrice() {
    const price = data['Net Price'];
    if (price.length > 3) {
      return '$' + price.substring(0, price.length - 3) + ',' + price.substring(price.length - 3) + '.00'
    } else {
      return '$' + price + '.00'
    }
  }

  return {
    address: this.getAddress(),
    customerName: this.customerName,
    email: this.email,
    phone: this.phone,
    customerEvent: this.customerEvent,
    taskStatus: this.taskStatus,
    installer: this.installer,
    installStart: this.installStart,
    installEnd: this.installEnd,
    branch: this.getBranch(),
    quoteNumber: this.quoteNumber,
    orderNumber: this.orderNumber,
    netPrice: this.getPrice(),
    salesRep: this.salesRep,
  }
}

module.exports = Marker;

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
    return '$' + data['Net Price'] + '.00'
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

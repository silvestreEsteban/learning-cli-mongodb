import mongoose from "mongoose";
import Customer from "./models/customer.js";

// map global promise - get rid of warning
mongoose.Promise = global.Promise;
// connect to db
const db = mongoose.connect("mongodb://127.0.0.1:27017/customercli", {});

// import model

// Add Customer
const addCustomer = (customer) => {
  Customer.create(customer).then((customer) => {
    console.info("New Customer Added");
    mongoose.connection.close();
  });
};
// Find Customer

const findCustomer = (name) => {
  // make case insensitive
  const search = new RegExp(name, "i");
  Customer.find({ $or: [{ firstname: search }, { lastname: search }] }).then(
    (customer) => {
      console.info(customer);
      console.info(`${customer.length} matches`);
      mongoose.connection.close();
    }
  );
};

const updateCustomer = (_id, customer) => {
  Customer.findByIdAndUpdate({ _id }, customer).then((_customer) => {
    console.info("Customer Updated");
    mongoose.connection.close();
  });
};

const removeCustomer = (_id) => {
  Customer.deleteOne({ _id }).then((_customer) => {
    console.info("Customer Removed");
    mongoose.connection.close();
  });
};

const listCustomers = () => {
  Customer.find().then((customers) => {
    console.info(customers);
    console.info(`${customers.length} customers`);
    mongoose.connection.close();
  });
};
// Export All Methods

export {
  addCustomer,
  findCustomer,
  updateCustomer,
  removeCustomer,
  listCustomers,
};

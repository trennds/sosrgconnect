import React from "react";
import { Card, TextField, Button } from "@material-ui/core";
import Layout from "../components/layout";

class PaymentPage extends React.Component {
  render() {
    return (
      <Layout>
        <Card>
          <form
            method="post"
            action="https://securegw-stage.paytm.in/theia/processTransaction"
          >
            <input name="MID" value="bjXpLI24705203812812" />
            <input name="WEBSITE" value="WEBSTAGING" />
            <input name="CHANNEL_ID" value="WEB" />
            <input name="INDUSTRY_TYPE_ID" value="Retail" />
            <input name="ORDER_ID" value="TEST_1582548216111" />
            <input name="CUST_ID" value="Customer001" />
            <input name="TXN_AMOUNT" value="2.00" />
            <input
              name="CALLBACK_URL"
              value="http://localhost/payment/callback"
            />
            <input name="EMAIL" value="abc@mailinator.com" />
            <input name="MOBILE_NO" value="7777777777" label="MID" />
            <input
              name="CHECKSUMHASH"
              value="WsLCKcRx3jhG0fQ4JMRwFCRnHuSI1f3cqnYBbjcqLWaamIsBvi6MzeS19i7XtWwB6QV5QSFuV4bObqSr9YBwzGkMe/vlhh8dwvqcvsnM9gU="
            />
            <button style={{margin: "0px 100px"}} type="submit">SUBMIT</button>
          </form>
        </Card>
      </Layout>
    );
  }
}

export default PaymentPage;

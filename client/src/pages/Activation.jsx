import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";

function Activation() {
  const { url } = useParams();
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const token = {
    activation_token: url,
  }
  useEffect(() => {
    if (url) {
      const activationEmail = async () => {
        try {
          setloading(true);
          const res = await axios.post(
            `${server}/user/activation`,
            token   
            ,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res) setloading(false);
          console.log(res.data.message);
        } catch (error) {
          setError(true);
          setloading(false);
          console.log(error.response.data.message);
        }
      };
      activationEmail();
    }
  }, [url]);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      {error ? (
        <p>Your token has expired</p>
      ) : (
        <p>Your account has been created</p>
      )}
    </div>
  );
}

export default Activation;

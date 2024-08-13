import { Container, Typography, Stack, Button, Tooltip, colors } from "@mui/material";
import { useNavigate } from "react-router-dom";
import coffee from '../assets/coffee.png';
import { useStripe, Stripe } from '@stripe/react-stripe-js';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { red } from "@mui/material/colors";
import { Cookie, Height } from "@mui/icons-material";
import Cookies from 'js-cookie'
import toast, { Toaster } from 'react-hot-toast';

const languages = [
  { name: "Japanese", code: "ja" },
  { name: "Hindi", code: "hi" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
];

const Home = () => {
  const stripe: Stripe | null = useStripe();
  const navigate = useNavigate();
  const user = Cookies?.get('user')

  const stripeClick = async () => {
    if (!stripe) {
      console.error('Stripe is not loaded yet.');
      return;
    }
    

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1PbSRE2NvV01L85tWpYv78Qk', // Replace with the ID of your price object
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: 'https://yourdomain.com/success', // Replace with your success URL
      cancelUrl: 'https://yourdomain.com/cancel',  // Replace with your cancel URL
    });

    if (error) {
      console.error('Error:', error);
    }
  };
  const notify = () => toast('Please login first ');
  const languageSelectHandler = (language: string): void => {
    if(user)
      navigate(`/learn?language=${language}`);
    else
       notify()
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "10rem" }} >
      <Typography variant="h3" p="2rem" textAlign="center">
        Welcome, Begin your journey of learning
      </Typography>
      <Stack direction="row" spacing="1rem" p="2rem" alignItems="center" justifyContent="center" >
        {languages.map(lang => (
          <AwesomeButton 
            key={lang.code} 
            type="danger" 
            size="medium"
            onPress={() => languageSelectHandler(lang.code)}
            
>
            
          
            {lang.name}
          </AwesomeButton>
        ))}
      </Stack>
      <Typography textAlign="center">Choose one language from above</Typography>
      <Tooltip title="Buy me a coffee" arrow>
        <Button
          role="link"
          onClick={stripeClick}
          sx={{
            height: "5rem",
            width: "10rem",
            borderRadius: "2rem",
            position: "fixed",
            right: "3%",
            top: "85%"
          }}
        >
          <img 
            style={{ height: "5rem", width: "20rem" }} 
            src={coffee} 
            alt="Coffee" 
          />
        </Button>
      </Tooltip>
      <Toaster  />
    </Container>
  );
};

export default Home;

# Handles webhooks from Overlaycat store paid orders
> How to use it:
1. Create a .env file with Google Cloud API credentials
2. Add your AWS Keys to .env file
3. For the first two itens, you can use the .env.example file for reference 
4. Run `npm install` on the functions folders to install all dependencies required
5. To emulate run `firebase emulators:start --only functions`
6. On the emulated environment you can send request like the following:
`
{
    "store_id": 1234567,
    "event": "order/paid",
    "id": "123456789"
}
`

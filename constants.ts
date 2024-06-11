export const constants = {
    payment: {
        lifeTimePayment:
            process.env.NODE_ENV === "development"
            ? 'https://buy.stripe.com/test_eVadR1gOwgC0dLqbII'
            : 'https://buy.stripe.com/9AQ7wkbmMgrhaU8288',
    } ,
    servicesUsage: {
        getBusinessesByLocationAndSector: {
            limiteConsultas: 3,
        }
    }
}
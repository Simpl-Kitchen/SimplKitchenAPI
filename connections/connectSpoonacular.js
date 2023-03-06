const SpoonacularApi = require('spoonacular_api_simplkitchen');
let defaultClient = SpoonacularApi.ApiClient.instance;
// Configure API key authorization: apiKeyScheme
let apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
apiKeyScheme.apiKey = 'e44c9f0796b4400ab3a69f1354d139a9';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//apiKeyScheme.apiKeyPrefix = 'Token';

const connectSpoonacularApi = (key) => {

    let defaultClient = SpoonacularApi.ApiClient.instance;
    let apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
    apiKeyScheme.apiKey = key;

    const apiInstance = new SpoonacularApi.IngredientsApi();

    return apiInstance
}
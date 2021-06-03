var axios = require('axios');
const { getAllProduct } = require('./domain/services/productService');
var productService = require("./domain/services/productService");
const userService = require("./domain/services/userService")

const apiUrl = 'https://stockx.com/api/browse?productCategory=sneakers&market.lowestAsk=gte-600'

var config = {
    method: 'get',
    url: apiUrl,
    headers: {
        'sec-fetch-mode': 'cors',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36',
        referer: 'https://stockx.com/sneakers',
        'cookie': ' __cfduid=df98299013ac2a143b345b3c2d02893631614653742', 'language_code': 'en', 'stockx_market_country': 'VN', '_ga': 'GA1.2.860630263.1614653746', '_pxvid': 'ca42de51-7b02-11eb-99c5-0242ac120015', 'tracker_device': 'f6af3db8-cffd-4129-b694-2ba1366ebe6e', '_gcl_au': '1.1.394311367.1614653749', 'IR_gbd': 'stockx.com', '_scid': '697486cb-0b8c-4639-832d-c8a37d55e7fc', 'below_retail_type': '', 'brand_tiles_version': 'v1', 'bulk_shipping_enabled': 'true', 'default_apple_pay': 'false', 'intl_payments': 'true', 'multi_edit_option': 'beatLowestAskBy', 'product_page_affirm_callout_enabled_web': 'false', 'related_products_length': 'v2', 'riskified_recover_updated_verbiage': 'false', 'show_all_as_number': 'false', 'show_how_it_works': 'true', 'show_watch_modal': 'true', 'product_page_refactor_web': 'false', 'recently_viewed_web_home': 'false', 'salesforce_chatbot_prod': 'true', 'home_vertical_rows_web': 'true', 'ops_banner_id': 'blteaa2251163e21ba6', '_fbp': 'fb.1.1614653750735.117042137', '_px_f394gi7Fvmc43dfg_user_id': 'Y2M5NjM4NDAtN2IwMi0xMWViLThlMDktZTMyNDBjMzcwNmJh', 'QuantumMetricUserID': '2dea84355ff1e2b412308b6dd1a0dc65', 'rskxRunCookie': '0', 'rCookie': '4nup6maioswgivyclgz9lcklrf5m4f', 'ajs_anonymous_id': '%229ad8131d-ffb1-43c3-a9f6-78a46bc38a3b%22', 'stockx_seen_ask_new_info': 'true', 'stockx_bagmodal_dismissed': 'true', 'stockx_experiments_id': 'web-anon-b4b3023c-a877-4b70-82e5-edf504bf4d06', 'web_low_inv_checkout': 'undefined', 'web_account_profile_redesign': 'undefined', '_gid': 'GA1.2.1956829717.1616986563', 'ajs_group_id': '%22ab_buy_now_rage_click_android.false%2Cab_ios_enable_suggested_addresses.false%2Cab_ios_seller_profile_redesign.novariant%2Cab_multiask_redesign_android_v2.false%2Cab_product_page_refactor_ios_v3.false%2Cab_test_product_page_refactor_web.false%2Cab_web_genesis_deux.false%22', 'stockx_dismiss_modal': 'true', 'stockx_dismiss_modal_set': '2021-03-29T02%3A56%3A10.370Z', 'stockx_dismiss_modal_expiration': '2021-04-05T02%3A56%3A10.369Z', 'stockx_product_visits': '13', 'is_gdpr': 'false', 'cookie_policy_accepted': 'true', 'stockx_ip_region': 'VN', 'stockx_session': '89d70c04-d360-401a-a0fe-0dbf4cad1db2', '_gat': '1', '_px3': 'e054876701e737fe68900da4f7b1a7ff9ea46370a4c8c9d71f991de75d1fecee:iTXKb200hf8rnn0CRIaKIyPLSfXu3wOe00XhA/bGDbugCfQ+IHVjkB3UvLY+XKjGe+Sos+DVimIol2wzpjS74g==:1000:UzJByJrLLNgHogYZVqav+Z5yK4ior6gWFnkmDLE2E8+tDfp0ObJBcWHnTzqv3CR6Va26YOhAHYnhoJysBwiHuxJ0gxPn6dpGfkKLjW2inE9rH3CQw7FMaSp8DXxWq7p1zRbZzlQTQgKFObis11wwotTeP/nEyGFE+ljTtxMqySw=', '_gat_UA-67038415-1': '1', '_pk_ref.421.1a3e': '%5B%22%22%2C%22%22%2C1617057763%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D', '_pk_ses.421.1a3e': '1', 'QuantumMetricSessionID': '81706d825226fd47d7e1dd27ae9111c2', '_px_7125205957_cs': 'eyJpZCI6IjEyZTYwMmIwLTkwZTAtMTFlYi1iYjBhLTUxZWVjYTg1ODFiZCIsInN0b3JhZ2UiOnt9LCJleHBpcmF0aW9uIjoxNjE3MDU5NjA4MDE0fQ==', '_dd_s': 'rum=0&expire=1617058709143', '_pk_id.421.1a3e': 'f1bae1caf602fa1c.1614653751.25.1617057809.1617057763.', 'stockx_homepage': 'sneakers', 'lastRskxRun': '1617057809341', 'IR_9060': '1617057805744%7C0%7C1617057805744%7C%7C', 'IR_PI': 'cbb415ea-7b02-11eb-a1a3-42010a24631e%7C1617144205744', 'qmexp': '1617059609551'

    }
};


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

var product = [];
function getRanSize() {
    var sizeQuantity = []
    const nonExist = getRandomInt(3, 13)
    for (let i = 0; i < 9; i += 0.5) {
        sizeQuantity = [...sizeQuantity, {
            size: `${3 + i}`,
            quantity: (3 + i) == nonExist ? 0 : getRandomInt(0, 100)
        }]
    }
    return sizeQuantity;
}

// axios(config)
//     .then(function (response) {
//         //   console.log(response.data.Products[0]);

//     })
//     .catch(function (error) {
//         console.log(error);
//     });

async function createProduct(productOps) {
    try {
        const newProduct = await productService.createProduct(productOps);
        console.log(`newProduct added ${newProduct.productName}`)
    } catch (error) {
        console.log("cant add product")
    }
}

async function makeRequest() {

    let response = await axios(config)
    // console.log(response.data.Products[0])
    response.data.Products.map((item) => {
        product = [...product, {
            productName: `${item.shoe} ${item.name}`,
            price: item.retailPrice,
            gender: item.gender,
            brand: item.brand,
            productCategory: item.productCategory,
            category: item.category,
            colorWay: item.colorway,
            imageurl: item.media.imageUrl,
            tickerSymbol: item.tickerSymbol,
            detail: item.traits,
            // description: item.description != null ? item.description.replace(/(<([^>]+)>)/gi, "") : "",
            description: item.description != null ? item.description : "",
            sizeQuantity: getRanSize(),
            tags: item._tags,
            urlKey: item.urlKey,
            releaseDate: new Date(item.releaseDate)
        }]
    })

}

// makeRequest()
//     .then(() => {
//         product.map(async (item) => await createProduct(item))
//     });


async function updatePro() {
    let res = await getAllProduct();
    res.map(async i => {
        // Object.assign(i, { releaseDate: i.detail.reduce((val, item) => item.name === "Release Date" ? new Date(item.value) : val, new Date("2020-04-08")) })
        // console.log(i.releaseDate)
        Object.assign(i, { numberSold: getRandomInt(5, 60) })
        try {
            const updateProduct = await productService.updateProduct(i._id, i);
            console.log(`newProduct added ${updateProduct.ok}`)
        } catch (error) {
            console.log("cant add product")
        }
    })
    // console.log(res[0])

}
// updatePro()

async function updateUser() {
    const res = await userService.getAllUser();
    res.map(async i => {
        Object.assign(i, {
            sex: "male",
            role: "user",
            phoneNumber: `09${getRandomInt(12345678, 99999999)}`,
            address: "",
        })
        // console.log(i);
        try {
            const updateProduct = await userService.updateUser(i._id, i);
            console.log(`user updated ${updateProduct.ok}`)
        } catch (error) {
            console.log("cant update user")
        }
    })
}

updateUser()
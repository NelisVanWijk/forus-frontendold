module.exports = [
    'ApiRequest',
    function(
        ApiRequest
    ) {
        let apiPrefix = '/platform/vouchers';

        let addType = (type, transaction) => {
            transaction.type = type;

            return transaction;
        };

        return new(function() {
            this.list = function() {
                return ApiRequest.get(apiPrefix);
            };

            this.get = function(address) {
                return ApiRequest.get(apiPrefix + '/' + address);
            }

            this.getAsProvider = function(address) {
                return ApiRequest.get(apiPrefix + '/' + address + '/provider');
            }

            this.sendToEmail = function(address) {
                return ApiRequest.post(apiPrefix + '/' + address + '/send-email');
            }

            this.makeTransaction = function(address, values) {
                return ApiRequest.post(apiPrefix + '/' + address + '/transactions', values);
            }

            this.makeProductVoucher = function(voucherAddress, productId) {
                return ApiRequest.post(apiPrefix, {
                    voucher_address: voucherAddress,
                    product_id: productId
                });
            };

            this.composeTransactions = function(voucher) {
                return voucher.transactions.slice().map(
                    transaction => addType('transaction', transaction)
                ).concat((voucher.product_vouchers || []).map(
                    product_voucher => addType('product_voucher', product_voucher)
                )).sort((a, b) => a.timestamp - b.timestamp);
            }

            this.composeCardData = function(voucher) {
                let thumbnail =  null;

                if (voucher.fund.logo) {
                    thumbnail = voucher.fund.logo.sizes.thumbnail;
                } else if(voucher.fund.organization.logo) {
                    thumbnail = voucher.fund.organization.logo.sizes.thumbnail;
                }

                return {
                    title: voucher.fund.name,
                    subtitle: voucher.fund.organization.name,
                    amount: voucher.amount,
                    type: voucher.type,
                    transactions: this.composeTransactions(voucher),
                    created_at_locale: voucher.created_at_locale,
                    expire_at_locale: voucher.expire_at_locale,
                    expire_at: voucher.expire_at,
                    thumbnail: thumbnail,
                    product: voucher.product || null,
                    fund: voucher.fund,
                    offices: voucher.offices || []
                };
            }
        });
    }
];
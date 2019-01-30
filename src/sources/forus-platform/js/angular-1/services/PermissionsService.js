module.exports = [() => {
    return new(function() {
        this.hasPermission = (organization, permissions, all = true) => {
            if (!organization || !organization.permissions) {
                return false;
            }

            if (typeof(permissions) === 'string') {
                permissions = [permissions];
            }
           
            
            if (all) {
                return permissions.filter((permissionItem) => {
                    return organization.permissions.indexOf(permissionItem) !== -1;
                }).length == permissions.length;
            }
            
            return permissions.filter((permissionItem) => {
                return organization.permissions.indexOf(permissionItem) !== -1;
            }).length > 0;
        };
    });
}];
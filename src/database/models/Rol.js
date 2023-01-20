const Rol = (sequelize, Sequelize) => {
    const model = sequelize.define('roles', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true
            }
        },
        {
            timestamps: false,
        }
    );
 
    model.associate = (models) => {
        model.hasMany(models.users, {
            foreignKey: 'role_id',
            as: 'users'
        });
    }
 
    return model;
}

module.exports = Rol;
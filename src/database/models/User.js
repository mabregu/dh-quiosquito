module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'El email necesita ser unico'
            },
            validate: {
                isEmail: {
                    msg: 'El email no es valido'
                },
                notEmpty: {
                    msg: 'El email necesita ser unico'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        timestamps: true,
    });

    // User.associate = (models) => {
    //     User.hasMany(models.Product, {
    //         foreignKey: 'user_id',
    //         as: 'products'
    //     });
    // }

    return User;
}
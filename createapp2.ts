import { MendixPlatformClient } from "mendixplatformsdk";
import { IModel, projects, security, domainmodels, enumerations, texts } from 'mendixmodelsdk';

main().catch(console.error);


async function main()
{
    const client = new MendixPlatformClient();

    // Create the app
    const app = await client.createNewApp("SDKTestApp", {summary: "Test App created using the Mendix SDKs", templateId: "5cdf7b82-e902-4b8d-b0dd-bdd939c9e82f"});

    console.log("App created with App ID: " + app.appId);

    // Open a working copy
    const workingCopy = await app.createTemporaryWorkingCopy("trunk");
    const model = await workingCopy.openModel();

    // Create a new module
    const module = projects.Module.createIn(model.allProjects()[0]);
    module.name = "SDKModule";

    // Set up module security
    const moduleSecurity = security.ModuleSecurity.createIn(module);
    const adminRole = security.ModuleRole.createIn(moduleSecurity);
    adminRole.name = "Admin";
    const userRole = security.ModuleRole.createIn(moduleSecurity);
    userRole.name = "User";

    // Create the module domain model
    const domainModel = domainmodels.DomainModel.createIn(module);

    // Make the Order Status enumeration with its values
    const statusEnumeration = enumerations.Enumeration.createIn(module);
    statusEnumeration.name = "ENUM_Status";

    createEnumerationOption(model, statusEnumeration, "_New", "New");
    createEnumerationOption(model, statusEnumeration, "Hold", "On Hold");
    createEnumerationOption(model, statusEnumeration, "Progress", "In Progress");
    createEnumerationOption(model, statusEnumeration, "Completed", "Completed");

    // Create the Order Line Entity and attributes
    const orderLineEntity = createEntity(domainModel, "OrderLine", 100, 100, "The Order Line entity created using the Model SDK");

    const orderLineIdAttribute = createAttribute(orderLineEntity, "OrderLineId", domainmodels.IntegerAttributeType.create(model), "", "The Id of this Order Line unique within an order created using the Model SDK");
    const orderLineValueAttribute = createAttribute(orderLineEntity, "OrderLineValue", domainmodels.DecimalAttributeType.create(model), "", "The Value of this Order Line created using the Model SDK");
    const orderLineProductNameAttributeType = domainmodels.StringAttributeType.create(model);
    orderLineProductNameAttributeType.length = 300;
    const orderLineProductNameAttribute = createAttribute(orderLineEntity, "ProductName", orderLineProductNameAttributeType, "Happy Days", "The name of the Product the subject of this Order Line created using the Model SDK");
    addAttributeRequiredRule(model, orderLineEntity, orderLineProductNameAttribute, "A Product Name must be entered");

    // Create the Order Entity and its attributes
    const orderEntity = createEntity(domainModel, "Order", 500, 100, "The Order Entity specializing from System.FileDocument created using the Model SDK");
    const orderEntityGeneralization = domainmodels.Generalization.createIn(orderEntity);
    (orderEntityGeneralization as any)["__generalization"].updateWithRawValue("System.FileDocument");

    const orderIdAttribute = createAttribute(orderEntity, "OrderId", domainmodels.AutoNumberAttributeType.create(model), "1", "The Id of this Order Id unique accross the system created using the Model SDK");
    const orderValueAttribute = createAttribute(orderEntity, "OrderValue", domainmodels.DecimalAttributeType.create(model), "", "The Value of this Order created using the Model SDK");

    const customerNameAttributeType = domainmodels.StringAttributeType.create(model);
    customerNameAttributeType.length = 100;
    const customerNameAttribute = createAttribute(orderEntity, "CustomerName", customerNameAttributeType, "", "The name of the Customer who raised this Order created using the Model SDK");

    const orderStatusAttributeType = domainmodels.EnumerationAttributeType.create(model);
    orderStatusAttributeType.enumeration = statusEnumeration;
    const orderStatusAttribute = createAttribute(orderEntity, "OrderStatus", orderStatusAttributeType, "_New", "The status of this Order created using the Model SDK");

    // Create the OrderSearch non-persistent Entity
    const orderSearchEntity = createEntity(domainModel, "OrderSearch", 900, 100, "A non-persistent entity used for searching Orders created using the Model SDK");
    const orderSearchEntityNoGeneralization = domainmodels.NoGeneralization.createIn(orderSearchEntity);
    orderSearchEntityNoGeneralization.persistable = false;

    const orderSearchMiniumuValueAttribute = createAttribute(orderSearchEntity, "MinimumValue", domainmodels.DecimalAttributeType.create(model), "", "The search order value minimum value created using the Model SDK");
    const orderSearchMaxiumuValueAttribute = createAttribute(orderSearchEntity, "MaximumValue", domainmodels.DecimalAttributeType.create(model), "", "The search order value maximum value created using the Model SDK");

    // Create the association between the OrderLine and Order Entities
    const association = domainmodels.Association.createIn(domainModel);
    association.name = "OrderLine_Order"; 
    association.child = orderEntity;
    association.parent = orderLineEntity;
    association.type = domainmodels.AssociationType.Reference;
    association.owner = domainmodels.AssociationOwner.Default;
    association.childConnection = { x: 0, y: 50 };
    association.parentConnection = { x: 100, y: 50 };
    association.documentation = "Association created using the Model SDK";
    const associationDeleteBehavior = domainmodels.AssociationDeleteBehavior.createIn(association);
    associationDeleteBehavior.childDeleteBehavior = domainmodels.DeletingBehavior.DeleteMeAndReferences;
    association.deleteBehavior = associationDeleteBehavior;

    // Set up the security on the new module's Entities
    // Security settings for Order Line Entity for Admin user
    const orderLineEntityAdminAccessRule = createEntityAccessRule(orderLineEntity, true, true, domainmodels.MemberAccessRights.ReadWrite, [adminRole]);

    addAttributeMemberAccess(orderLineEntityAdminAccessRule, orderLineIdAttribute, domainmodels.MemberAccessRights.ReadWrite);
    addAttributeMemberAccess(orderLineEntityAdminAccessRule, orderLineProductNameAttribute, domainmodels.MemberAccessRights.ReadWrite);
    addAttributeMemberAccess(orderLineEntityAdminAccessRule, orderLineValueAttribute, domainmodels.MemberAccessRights.ReadWrite);
    addAssociationMemberAccess(orderLineEntityAdminAccessRule, association, domainmodels.MemberAccessRights.ReadWrite);

    // Security settings for Order Line Entity for regular user
    const orderLineEntityUserAccessRule = createEntityAccessRule(orderLineEntity, false, false, domainmodels.MemberAccessRights.ReadOnly, [userRole]);

    addAttributeMemberAccess(orderLineEntityUserAccessRule, orderLineIdAttribute, domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderLineEntityUserAccessRule, orderLineProductNameAttribute, domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderLineEntityUserAccessRule, orderLineValueAttribute, domainmodels.MemberAccessRights.ReadOnly);
    addAssociationMemberAccess(orderLineEntityUserAccessRule, association, domainmodels.MemberAccessRights.ReadOnly);

    // Security settings for Order Entity for Admin user
    const orderEntityAdminAccessRule = createEntityAccessRule(orderEntity, true, true, domainmodels.MemberAccessRights.ReadWrite, [adminRole]);
    
    addAttributeMemberAccess(orderEntityAdminAccessRule, orderIdAttribute, domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderEntityAdminAccessRule, orderValueAttribute, domainmodels.MemberAccessRights.ReadWrite);
    addAttributeMemberAccess(orderEntityAdminAccessRule, customerNameAttribute, domainmodels.MemberAccessRights.ReadWrite);
    addAttributeMemberAccess(orderEntityAdminAccessRule, orderStatusAttribute, domainmodels.MemberAccessRights.ReadWrite);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.Name", domainmodels.MemberAccessRights.ReadWrite);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.FileID", domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.DeleteAfterDownload", domainmodels.MemberAccessRights.ReadWrite);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.Contents", domainmodels.MemberAccessRights.ReadWrite);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.HasContents", domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityAdminAccessRule, "System.FileDocument.Size", domainmodels.MemberAccessRights.ReadOnly);

    // Security settings for Order Entity for regular user
    const orderEntityUserAccessRule = createEntityAccessRule(orderEntity, false, false, domainmodels.MemberAccessRights.ReadOnly, [userRole]);
    
    addAttributeMemberAccess(orderEntityUserAccessRule, orderIdAttribute, domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderEntityUserAccessRule, orderValueAttribute, domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderEntityUserAccessRule, customerNameAttribute, domainmodels.MemberAccessRights.ReadOnly);
    addAttributeMemberAccess(orderEntityUserAccessRule, orderStatusAttribute, domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.Name", domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.FileID", domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.DeleteAfterDownload", domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.Contents", domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.HasContents", domainmodels.MemberAccessRights.ReadOnly);
    addAttributeSystemMemberAccess(orderEntityUserAccessRule, "System.FileDocument.Size", domainmodels.MemberAccessRights.ReadOnly);
    
    // Security settings for OrderSearch Entity for both Admin and regular users
    const orderSearchEntityUserAccessRule = createEntityAccessRule(orderSearchEntity, true, true, domainmodels.MemberAccessRights.ReadWrite, [adminRole, userRole]);
    
    addAttributeMemberAccess(orderSearchEntityUserAccessRule, orderSearchMiniumuValueAttribute, domainmodels.MemberAccessRights.ReadWrite);
    addAttributeMemberAccess(orderSearchEntityUserAccessRule, orderSearchMaxiumuValueAttribute, domainmodels.MemberAccessRights.ReadWrite);

    // Set up the project level security roles. Set Production level security and put the module roles into the project roles
    const projectSecurity = await model.allProjectSecurities()[0].load();
    projectSecurity.securityLevel = security.SecurityLevel.CheckEverything;
    projectSecurity.checkSecurity = true;

    const adminRoleName = projectSecurity.adminUserRoleName;
    const projectAdminRole = projectSecurity.userRoles.find(t => t.name === adminRoleName);
    const projectUserRole = projectSecurity.userRoles.find(t => t.name === "User");

    if (projectAdminRole != undefined)
        projectAdminRole.moduleRoles.push(adminRole);
    if (projectUserRole != undefined)
        projectUserRole.moduleRoles.push(userRole);

    console.log("Committing changes to the repository");

    await model.flushChanges();
    await workingCopy.commitToRepository("trunk", {commitMessage: "App created and modified by my Create App Model SDK script"});

}

function createEnumerationOption(model: IModel, enumeration: enumerations.Enumeration, name: string, caption_en_US: string)
{
    const value = enumerations.EnumerationValue.createIn(enumeration);
    value.name = name;
    const caption = texts.Text.createInEnumerationValueUnderCaption(value);
    const translation = texts.Translation.create(model);
    translation.text = caption_en_US;
    translation.languageCode = "en_US";
    caption.translations.push(translation);
}

function createEntity(domainModel: domainmodels.DomainModel, name: string, x: number, y: number, documentation: string): domainmodels.Entity
{
    const entity = domainmodels.Entity.createIn(domainModel);
    entity.name = name;
    entity.location = { x: x, y: y};
    entity.documentation = documentation;
    return entity;
}

function createAttribute(entity: domainmodels.Entity, name: string, type: domainmodels.AttributeType, defaultValue?:string, documentation?:string): domainmodels.Attribute
{
    const attribute = domainmodels.Attribute.createIn(entity);
    attribute.name = name;
    attribute.type = type;
    if (defaultValue != undefined)
    {
        const attributeDefault = domainmodels.StoredValue.createIn(attribute);
        attributeDefault.defaultValue = defaultValue;
        attribute.value = attributeDefault;
    }
    if (documentation != undefined)
        attribute.documentation = documentation;

    return attribute;
}

function addAttributeRequiredRule(model: IModel, entity: domainmodels.Entity, attribute: domainmodels.Attribute, message_en_US: string)
{
    const validationRule = domainmodels.ValidationRule.createIn(entity);
    validationRule.attribute = attribute;
    domainmodels.RequiredRuleInfo.createIn(validationRule);
    const text = texts.Text.createInValidationRuleUnderErrorMessage(validationRule);
    const translation = texts.Translation.create(model);
    translation.text = message_en_US;
    translation.languageCode = "en_US";
    text.translations.push(translation);
}

function createEntityAccessRule(entity: domainmodels.Entity, allowCreate: boolean, allowDelete: boolean, defaultMemberRights: domainmodels.MemberAccessRights, roles: security.ModuleRole[]): domainmodels.AccessRule
{
    const accessRule = domainmodels.AccessRule.createInEntityUnderAccessRules(entity);
    accessRule.allowCreate = allowCreate;
    accessRule.allowDelete = allowDelete;
    accessRule.defaultMemberAccessRights = defaultMemberRights;
    for (var role of roles)
        accessRule.moduleRoles.push(role);
    return accessRule;
}

function addAttributeMemberAccess(accessRule: domainmodels.AccessRule, attribute: domainmodels.Attribute, accessRights: domainmodels.MemberAccessRights)
{
    const memberAccess = domainmodels.MemberAccess.createIn(accessRule);
    memberAccess.accessRights = accessRights;
    memberAccess.attribute = attribute;
}

function addAttributeSystemMemberAccess(accessRule: domainmodels.AccessRule, attribute: string, accessRights: domainmodels.MemberAccessRights)
{
    const memberAccess = domainmodels.MemberAccess.createIn(accessRule);
    memberAccess.accessRights = accessRights;
    (memberAccess as any)["__attribute"].updateWithRawValue(attribute);
}

function addAssociationMemberAccess(accessRule: domainmodels.AccessRule, association: domainmodels.Association, accessRights: domainmodels.MemberAccessRights)
{
    const memberAccess = domainmodels.MemberAccess.createIn(accessRule);
    memberAccess.accessRights = accessRights;
    memberAccess.association = association;
}

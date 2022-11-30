import { MendixPlatformClient } from "mendixplatformsdk";
import { projects, security, domainmodels, enumerations, texts } from 'mendixmodelsdk';

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

    const statusEnumerationValue1 = enumerations.EnumerationValue.createIn(statusEnumeration);
    statusEnumerationValue1.name = "_New";
    const statusEnumerationCaption1 = texts.Text.createInEnumerationValueUnderCaption(statusEnumerationValue1);
    const statusEnumerationTranslation1 = texts.Translation.create(model);
    statusEnumerationTranslation1.text = "New";
    statusEnumerationTranslation1.languageCode = "en_US";
    statusEnumerationCaption1.translations.push(statusEnumerationTranslation1);

    const statusEnumerationValue2 = enumerations.EnumerationValue.createIn(statusEnumeration);
    statusEnumerationValue2.name = "Hold";
    const statusEnumerationCaption2 = texts.Text.createInEnumerationValueUnderCaption(statusEnumerationValue2);
    const statusEnumerationTranslation2 = texts.Translation.create(model);
    statusEnumerationTranslation2.text = "On Hold";
    statusEnumerationTranslation2.languageCode = "en_US";
    statusEnumerationCaption2.translations.push(statusEnumerationTranslation2);
   
    const statusEnumerationValue3 = enumerations.EnumerationValue.createIn(statusEnumeration);
    statusEnumerationValue3.name = "Progress";
    const statusEnumerationCaption3 = texts.Text.createInEnumerationValueUnderCaption(statusEnumerationValue3);
    const statusEnumerationTranslation3 = texts.Translation.create(model);
    statusEnumerationTranslation3.text = "In Progress";
    statusEnumerationTranslation3.languageCode = "en_US";
    statusEnumerationCaption3.translations.push(statusEnumerationTranslation3);
   
    const statusEnumerationValue4 = enumerations.EnumerationValue.createIn(statusEnumeration);
    statusEnumerationValue4.name = "Completed";
    const statusEnumerationCaption4 = texts.Text.createInEnumerationValueUnderCaption(statusEnumerationValue4);
    const statusEnumerationTranslation4 = texts.Translation.create(model);
    statusEnumerationTranslation4.text = "Completed";
    statusEnumerationTranslation4.languageCode = "en_US";
    statusEnumerationCaption4.translations.push(statusEnumerationTranslation4);
   
    // Create the Order Line Entity and attributes
    const orderLineEntity = domainmodels.Entity.createIn(domainModel);
    orderLineEntity.name = "OrderLine";
    orderLineEntity.location = { x: 100, y: 100};
    orderLineEntity.documentation = "The Order Line entity created using the Model SDK";

    const orderLineIdAttributeType = domainmodels.IntegerAttributeType.create(model);
    const orderLineIdAttributeDefault = domainmodels.StoredValue.create(model);
    orderLineIdAttributeDefault.defaultValue = "";
    const orderLineIdAttribute = domainmodels.Attribute.createIn(orderLineEntity);
    orderLineIdAttribute.name = "OrderLineId";
    orderLineIdAttribute.type = orderLineIdAttributeType;
    orderLineIdAttribute.value = orderLineIdAttributeDefault;
    orderLineIdAttribute.documentation = "The Id of this Order Line unique within an order created using the Model SDK";

    const orderLineValueAttributeType = domainmodels.DecimalAttributeType.create(model);
    const orderLineValueAttributeDefault = domainmodels.StoredValue.create(model);
    orderLineValueAttributeDefault.defaultValue = "";
    const orderLineValueAttribute = domainmodels.Attribute.createIn(orderLineEntity);
    orderLineValueAttribute.name = "OrderLineValue";
    orderLineValueAttribute.type = orderLineValueAttributeType;
    orderLineValueAttribute.value = orderLineValueAttributeDefault;
    orderLineValueAttribute.documentation = "The Value of this Order Line created using the Model SDK";

    const orderLineProductNameAttributeType = domainmodels.StringAttributeType.create(model);
    orderLineProductNameAttributeType.length = 300;
    const orderLineProductNameAttributeDefault = domainmodels.StoredValue.create(model);
    orderLineProductNameAttributeDefault.defaultValue = "Happy Days";
    const orderLineProductNameAttribute = domainmodels.Attribute.createIn(orderLineEntity);
    orderLineProductNameAttribute.name = "ProductName";
    orderLineProductNameAttribute.type = orderLineProductNameAttributeType;
    orderLineProductNameAttribute.value = orderLineProductNameAttributeDefault;
    orderLineProductNameAttribute.documentation = "The name of the Product the subject of this Order Line created using the Model SDK";
    const orderLineEntityValidationRule1 = domainmodels.ValidationRule.createIn(orderLineEntity);
    orderLineEntityValidationRule1.attribute = orderLineProductNameAttribute;
    domainmodels.RequiredRuleInfo.createIn(orderLineEntityValidationRule1);
    const orderLineEntityValidationRuleText = texts.Text.createInValidationRuleUnderErrorMessage(orderLineEntityValidationRule1);
    const orderLineEntityValidationRuleTranslation = texts.Translation.create(model);
    orderLineEntityValidationRuleTranslation.text = "A Product Name must be entered";
    orderLineEntityValidationRuleTranslation.languageCode = "en_US";
    orderLineEntityValidationRuleText.translations.push(orderLineEntityValidationRuleTranslation);


    // Create the Order Entity and its attributes
    const orderEntity = domainmodels.Entity.createIn(domainModel);
    orderEntity.name = "Order";
    orderEntity.location = { x: 500, y: 100};
    orderEntity.documentation = "The Order Entity specializing from System.FileDocument created using the Model SDK";
    const orderEntityGeneralization = domainmodels.Generalization.createIn(orderEntity);
    (orderEntityGeneralization as any)["__generalization"].updateWithRawValue("System.FileDocument");

    const orderIdAttributeType = domainmodels.AutoNumberAttributeType.create(model);
    const orderIdAttributeDefault = domainmodels.StoredValue.create(model);
    orderIdAttributeDefault.defaultValue = "1";
    const orderIdAttribute = domainmodels.Attribute.createIn(orderEntity);
    orderIdAttribute.name = "OrderId";
    orderIdAttribute.type = orderIdAttributeType;
    orderIdAttribute.value = orderIdAttributeDefault;
    orderIdAttribute.documentation = "The Id of this Order Id unique accross the system created using the Model SDK";

    const orderValueAttributeType = domainmodels.DecimalAttributeType.create(model);
    const orderValueAttributeDefault = domainmodels.StoredValue.create(model);
    orderValueAttributeDefault.defaultValue = "";
    const orderValueAttribute = domainmodels.Attribute.createIn(orderEntity);
    orderValueAttribute.name = "OrderValue";
    orderValueAttribute.type = orderValueAttributeType;
    orderValueAttribute.value = orderValueAttributeDefault;
    orderValueAttribute.documentation = "The Value of this Order created using the Model SDK";

    const customerNameAttributeType = domainmodels.StringAttributeType.create(model);
    customerNameAttributeType.length = 100;
    const customerNameAttributeDefault = domainmodels.StoredValue.create(model);
    customerNameAttributeDefault.defaultValue = "";
    const customerNameAttribute = domainmodels.Attribute.createIn(orderEntity);
    customerNameAttribute.name = "CustomerName";
    customerNameAttribute.type = customerNameAttributeType;
    customerNameAttribute.value = customerNameAttributeDefault;
    customerNameAttribute.documentation = "The name of the Customer who raised this Order created using the Model SDK";

    const orderStatusAttributeType = domainmodels.EnumerationAttributeType.create(model);
    orderStatusAttributeType.enumeration = statusEnumeration;
    const orderStatusAttributeDefault = domainmodels.StoredValue.create(model);
    orderStatusAttributeDefault.defaultValue = "_New";
    const orderStatusAttribute = domainmodels.Attribute.createIn(orderEntity);
    orderStatusAttribute.name = "OrderStatus";
    orderStatusAttribute.type = orderStatusAttributeType;
    orderStatusAttribute.value = orderStatusAttributeDefault;
    orderStatusAttribute.documentation = "The status of this Order created using the Model SDK";

    // Create the OrderSearch non-persistent Entity
    const orderSearchEntity = domainmodels.Entity.createIn(domainModel);
    orderSearchEntity.name = "OrderSearch";
    orderSearchEntity.location = { x: 900, y: 100};
    orderSearchEntity.documentation = "A non-persistent entity used for searching Orders created using the Model SDK";
    const orderSearchEntityNoGeneralization = domainmodels.NoGeneralization.createIn(orderSearchEntity);
    orderSearchEntityNoGeneralization.persistable = false;

    const orderSearchMinimumValueAttributeType = domainmodels.DecimalAttributeType.create(model);
    const orderSearchMinimumValueDefaultValue = domainmodels.StoredValue.create(model);
    orderSearchMinimumValueDefaultValue.defaultValue = "";
    const orderSearchMiniumuValueAttribute = domainmodels.Attribute.createIn(orderSearchEntity);
    orderSearchMiniumuValueAttribute.name = "MinimumValue";
    orderSearchMiniumuValueAttribute.type = orderSearchMinimumValueAttributeType;
    orderSearchMiniumuValueAttribute.value = orderSearchMinimumValueDefaultValue;
    orderSearchMiniumuValueAttribute.documentation = "The search order value minimum value created using the Model SDK";

    const orderSearchMaximumValueAttributeType = domainmodels.DecimalAttributeType.create(model);
    const orderSearchMaximumValueDefaultValue = domainmodels.StoredValue.create(model);
    orderSearchMaximumValueDefaultValue.defaultValue = "";
    const orderSearchMaxiumuValueAttribute = domainmodels.Attribute.createIn(orderSearchEntity);
    orderSearchMaxiumuValueAttribute.name = "MaximumValue";
    orderSearchMaxiumuValueAttribute.type = orderSearchMaximumValueAttributeType;
    orderSearchMaxiumuValueAttribute.value = orderSearchMaximumValueDefaultValue;
    orderSearchMaxiumuValueAttribute.documentation = "The search order value maximum value created using the Model SDK";

    // Create the association between the OrderLine and Order Entities
    const association = domainmodels.Association.createIn(domainModel);
    association.name = "OrderLine_Order"; 
    association.child = orderEntity;
    association.parent = orderLineEntity;
    association.type = domainmodels.AssociationType.Reference;
    association.owner = domainmodels.AssociationOwner.Default;
    association.childConnection = { x: 0, y: 50};
    association.parentConnection = { x: 100, y: 50};
    association.documentation = "Association created using the Model SDK";
    const associationDeleteBehavior = domainmodels.AssociationDeleteBehavior.createIn(association);
    associationDeleteBehavior.childDeleteBehavior = domainmodels.DeletingBehavior.DeleteMeAndReferences;
    association.deleteBehavior = associationDeleteBehavior;

    // Set up the security on the new module's Entities
    // Security settings for Order Line Entity for Admin user
    const orderLineEntityAdminAccessRule = domainmodels.AccessRule.createInEntityUnderAccessRules(orderLineEntity);
    orderLineEntityAdminAccessRule.allowCreate = true;
    orderLineEntityAdminAccessRule.allowDelete = true;
    orderLineEntityAdminAccessRule.defaultMemberAccessRights = domainmodels.MemberAccessRights.ReadWrite;
    orderLineEntityAdminAccessRule.moduleRoles.push(adminRole);
    
    const orderLineEntityAdminAccessOrderLineId = domainmodels.MemberAccess.createIn(orderLineEntityAdminAccessRule);
    orderLineEntityAdminAccessOrderLineId.attribute = orderLineIdAttribute;
    orderLineEntityAdminAccessOrderLineId.accessRights = domainmodels.MemberAccessRights.ReadWrite;

    const orderLineEntityAdminAccessProductName = domainmodels.MemberAccess.createIn(orderLineEntityAdminAccessRule);
    orderLineEntityAdminAccessProductName.attribute = orderLineProductNameAttribute;
    orderLineEntityAdminAccessProductName.accessRights = domainmodels.MemberAccessRights.ReadWrite;

    const orderLineEntityAdminAccessOrderLineValue = domainmodels.MemberAccess.createIn(orderLineEntityAdminAccessRule);
    orderLineEntityAdminAccessOrderLineValue.attribute = orderLineValueAttribute;
    orderLineEntityAdminAccessOrderLineValue.accessRights = domainmodels.MemberAccessRights.ReadWrite;

    const orderLineEntityAdminAccessAssociation = domainmodels.MemberAccess.createIn(orderLineEntityAdminAccessRule);
    orderLineEntityAdminAccessAssociation.association = association;
    orderLineEntityAdminAccessAssociation.accessRights = domainmodels.MemberAccessRights.ReadWrite;

    // Security settings for Order Line Entity for regular user
    const orderLineEntityUserAccessRule = domainmodels.AccessRule.createInEntityUnderAccessRules(orderLineEntity);
    orderLineEntityUserAccessRule.allowCreate = false;
    orderLineEntityUserAccessRule.allowDelete = false;
    orderLineEntityUserAccessRule.defaultMemberAccessRights = domainmodels.MemberAccessRights.ReadOnly;
    orderLineEntityUserAccessRule.moduleRoles.push(userRole);
    
    const orderLineEntityUserAccessOrderLineId = domainmodels.MemberAccess.createIn(orderLineEntityUserAccessRule);
    orderLineEntityUserAccessOrderLineId.attribute = orderLineIdAttribute;
    orderLineEntityUserAccessOrderLineId.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderLineEntityUserAccessProductName = domainmodels.MemberAccess.createIn(orderLineEntityUserAccessRule);
    orderLineEntityUserAccessProductName.attribute = orderLineProductNameAttribute;
    orderLineEntityUserAccessProductName.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderLineEntityUserAccessOrderLineValue = domainmodels.MemberAccess.createIn(orderLineEntityUserAccessRule);
    orderLineEntityUserAccessOrderLineValue.attribute = orderLineValueAttribute;
    orderLineEntityUserAccessOrderLineValue.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderLineEntityUserAccessAssociation = domainmodels.MemberAccess.createIn(orderLineEntityUserAccessRule);
    orderLineEntityUserAccessAssociation.association = association;
    orderLineEntityUserAccessAssociation.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    // Security settings for Order Entity for Admin user
    const orderEntityAdminAccessRule = domainmodels.AccessRule.createInEntityUnderAccessRules(orderEntity);
    orderEntityAdminAccessRule.allowCreate = true;
    orderEntityAdminAccessRule.allowDelete = true;
    orderEntityAdminAccessRule.defaultMemberAccessRights = domainmodels.MemberAccessRights.ReadWrite;
    orderEntityAdminAccessRule.moduleRoles.push(adminRole);
    
    const orderEntityAdminAccessOrderId = domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessOrderId.attribute = orderIdAttribute;
    orderEntityAdminAccessOrderId.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityAdminAccessOrderValue = domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessOrderValue.attribute = orderValueAttribute;
    orderEntityAdminAccessOrderValue.accessRights = domainmodels.MemberAccessRights.ReadWrite;

    const orderEntityAdminAccessCustomerName = domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessCustomerName.attribute = customerNameAttribute;
    orderEntityAdminAccessCustomerName.accessRights = domainmodels.MemberAccessRights.ReadWrite;

    const orderEntityAdminAccessOrderStatus = domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    orderEntityAdminAccessOrderStatus.attribute = orderStatusAttribute;
    orderEntityAdminAccessOrderStatus.accessRights = domainmodels.MemberAccessRights.ReadWrite;

    const orderEntityAdminAccessName = domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    (orderEntityAdminAccessName as any)["__attribute"].updateWithRawValue("System.FileDocument.Name");
    orderEntityAdminAccessName.accessRights = domainmodels.MemberAccessRights.ReadWrite;

    const orderEntityAdminAccessFileId = domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    (orderEntityAdminAccessFileId as any)["__attribute"].updateWithRawValue("System.FileDocument.FileID");
    orderEntityAdminAccessFileId.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityAdminAccessDeleteAfterDownload = domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    (orderEntityAdminAccessDeleteAfterDownload as any)["__attribute"].updateWithRawValue("System.FileDocument.DeleteAfterDownload");
    orderEntityAdminAccessDeleteAfterDownload.accessRights = domainmodels.MemberAccessRights.ReadWrite;

    const orderEntityAdminAccessContents = domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    (orderEntityAdminAccessContents as any)["__attribute"].updateWithRawValue("System.FileDocument.Contents");
    orderEntityAdminAccessContents.accessRights = domainmodels.MemberAccessRights.ReadWrite;

    const orderEntityAdminAccessHasContents = domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    (orderEntityAdminAccessHasContents as any)["__attribute"].updateWithRawValue("System.FileDocument.HasContents");
    orderEntityAdminAccessHasContents.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityAdminAccessSize = domainmodels.MemberAccess.createIn(orderEntityAdminAccessRule);
    (orderEntityAdminAccessSize as any)["__attribute"].updateWithRawValue("System.FileDocument.Size");
    orderEntityAdminAccessSize.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    // Security settings for Order Entity for regular user
    const orderEntityUserAccessRule = domainmodels.AccessRule.createInEntityUnderAccessRules(orderEntity);
    orderEntityUserAccessRule.allowCreate = false;
    orderEntityUserAccessRule.allowDelete = false;
    orderEntityUserAccessRule.defaultMemberAccessRights = domainmodels.MemberAccessRights.ReadOnly;
    orderEntityUserAccessRule.moduleRoles.push(userRole);
    
    const orderEntityUserAccessOrderId = domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccessOrderId.attribute = orderIdAttribute;
    orderEntityUserAccessOrderId.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityUserAccessOrderValue = domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccessOrderValue.attribute = orderValueAttribute;
    orderEntityUserAccessOrderValue.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityUserAccesCustomerName = domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccesCustomerName.attribute = customerNameAttribute;
    orderEntityUserAccesCustomerName.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityUserAccesOrderStatus = domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    orderEntityUserAccesOrderStatus.attribute = orderStatusAttribute;
    orderEntityUserAccesOrderStatus.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityUserAccessName = domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    (orderEntityUserAccessName as any)["__attribute"].updateWithRawValue("System.FileDocument.Name");
    orderEntityUserAccessName.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityUserAccessFileId = domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    (orderEntityUserAccessFileId as any)["__attribute"].updateWithRawValue("System.FileDocument.FileID");
    orderEntityUserAccessFileId.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityUserAccessDeleteAfterDownload = domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    (orderEntityUserAccessDeleteAfterDownload as any)["__attribute"].updateWithRawValue("System.FileDocument.DeleteAfterDownload");
    orderEntityUserAccessDeleteAfterDownload.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityUserAccessContents = domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    (orderEntityUserAccessContents as any)["__attribute"].updateWithRawValue("System.FileDocument.Contents");
    orderEntityUserAccessContents.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityUserAccessHasContents = domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    (orderEntityUserAccessHasContents as any)["__attribute"].updateWithRawValue("System.FileDocument.HasContents");
    orderEntityUserAccessHasContents.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    const orderEntityUserAccessSize = domainmodels.MemberAccess.createIn(orderEntityUserAccessRule);
    (orderEntityUserAccessSize as any)["__attribute"].updateWithRawValue("System.FileDocument.Size");
    orderEntityUserAccessSize.accessRights = domainmodels.MemberAccessRights.ReadOnly;

    // Security settings for OrderSearch Entity for both Admin and regular users
    const orderSearchEntityUserAccessRule = domainmodels.AccessRule.createInEntityUnderAccessRules(orderSearchEntity);
    orderSearchEntityUserAccessRule.allowCreate = true;
    orderSearchEntityUserAccessRule.allowDelete = true;
    orderSearchEntityUserAccessRule.defaultMemberAccessRights = domainmodels.MemberAccessRights.ReadWrite;
    orderSearchEntityUserAccessRule.moduleRoles.push(adminRole);
    orderSearchEntityUserAccessRule.moduleRoles.push(userRole);
    
    const orderSearchEntityUserAccessMinimumValue = domainmodels.MemberAccess.createIn(orderSearchEntityUserAccessRule);
    orderSearchEntityUserAccessMinimumValue.attribute = orderSearchMiniumuValueAttribute;
    orderSearchEntityUserAccessMinimumValue.accessRights = domainmodels.MemberAccessRights.ReadWrite;

    const orderSearchEntityUserAccessMaximumValue = domainmodels.MemberAccess.createIn(orderSearchEntityUserAccessRule);
    orderSearchEntityUserAccessMaximumValue.attribute = orderSearchMaxiumuValueAttribute;
    orderSearchEntityUserAccessMaximumValue.accessRights = domainmodels.MemberAccessRights.ReadWrite;

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

